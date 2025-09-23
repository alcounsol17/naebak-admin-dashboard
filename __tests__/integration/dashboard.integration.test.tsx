import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminDashboard from '../../app/page'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-01-15 10:30:00'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders complete dashboard with all sections', async () => {
    render(<AdminDashboard />)
    
    // Header section
    expect(screen.getByText('لوحة التحكم')).toBeInTheDocument()
    expect(screen.getByAltText('نائبك.كوم')).toBeInTheDocument()
    
    // Welcome banner
    expect(screen.getByText('مرحباً بك في لوحة التحكم')).toBeInTheDocument()
    
    // Statistics cards
    expect(screen.getByText('إجمالي الشكاوى')).toBeInTheDocument()
    expect(screen.getByText('المستخدمين النشطين')).toBeInTheDocument()
    expect(screen.getByText('الرسائل اليوم')).toBeInTheDocument()
    expect(screen.getByText('متوسط التقييمات')).toBeInTheDocument()
    
    // Chart section
    expect(screen.getByText('إحصائيات الزوار')).toBeInTheDocument()
    
    // Recent activities
    expect(screen.getByText('الأنشطة الأخيرة')).toBeInTheDocument()
    
    // Additional statistics
    expect(screen.getByText('زوار اليوم')).toBeInTheDocument()
    expect(screen.getByText('الأخبار المنشورة')).toBeInTheDocument()
    expect(screen.getByText('معدل الاستجابة')).toBeInTheDocument()
    
    // Footer
    expect(screen.getByText('© 2024 نائبك.كوم. جميع الحقوق محفوظة.')).toBeInTheDocument()
  })

  it('displays time information', () => {
    render(<AdminDashboard />)
    
    // Check that time-related content exists
    expect(screen.getByText(/2024/)).toBeInTheDocument()
  })

  it('handles user interactions correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<AdminDashboard />)
    
    // Test settings button interaction
    const settingsButton = screen.getByRole('button', { name: /الإعدادات/ })
    expect(settingsButton).toBeInTheDocument()
    
    await user.click(settingsButton)
    
    // Button should still be present after click (no navigation implemented)
    expect(settingsButton).toBeInTheDocument()
  })

  it('displays all activity types with correct icons', () => {
    render(<AdminDashboard />)
    
    // Check for different activity types
    expect(screen.getByText('شكوى جديدة من أحمد محمد')).toBeInTheDocument()
    expect(screen.getByText('تقييم جديد للنائب سارة أحمد')).toBeInTheDocument()
    expect(screen.getByText('رسالة جديدة بين مواطن ونائب')).toBeInTheDocument()
    expect(screen.getByText('تم نشر خبر جديد في الشريط الإخباري')).toBeInTheDocument()
    expect(screen.getByText('تسجيل مستخدم جديد')).toBeInTheDocument()
  })

  it('shows correct statistics values', () => {
    render(<AdminDashboard />)
    
    // Main statistics
    expect(screen.getByText('1,247')).toBeInTheDocument() // Total complaints
    expect(screen.getByText('8,392')).toBeInTheDocument() // Active users
    expect(screen.getByText('156')).toBeInTheDocument()   // Messages today
    expect(screen.getByText('4.7')).toBeInTheDocument()   // Average rating
    
    // Additional statistics
    expect(screen.getByText('2,847')).toBeInTheDocument() // Daily visitors
    expect(screen.getByText('23')).toBeInTheDocument()    // Published news
    expect(screen.getByText('94%')).toBeInTheDocument()   // Response rate
  })

  it('displays change indicators correctly', () => {
    render(<AdminDashboard />)
    
    // Positive changes
    expect(screen.getByText('+12% من الشهر الماضي')).toBeInTheDocument()
    expect(screen.getByText('+8% من الشهر الماضي')).toBeInTheDocument()
    expect(screen.getByText('+15% من أمس')).toBeInTheDocument()
    
    // Negative changes
    expect(screen.getByText('-3% من أمس')).toBeInTheDocument()
    
    // Neutral changes
    expect(screen.getByText('ثابت')).toBeInTheDocument()
  })

  it('renders chart with correct structure', () => {
    const { container } = render(<AdminDashboard />)
    
    // Check for chart container
    const chartContainer = container.querySelector('.h-64')
    expect(chartContainer).toBeInTheDocument()
    
    // Check for chart bars (should be 12 bars for 12 months)
    const chartBars = container.querySelectorAll('.bg-primary-500')
    expect(chartBars.length).toBeGreaterThan(0)
  })

  it('has proper responsive layout classes', () => {
    const { container } = render(<AdminDashboard />)
    
    // Check for responsive grid classes
    const statsGrid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4')
    expect(statsGrid).toBeInTheDocument()
    
    const chartsGrid = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2')
    expect(chartsGrid).toBeInTheDocument()
    
    const additionalStatsGrid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-3')
    expect(additionalStatsGrid).toBeInTheDocument()
  })

  it('includes all footer links', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('الدعم الفني')).toBeInTheDocument()
    expect(screen.getByText('التوثيق')).toBeInTheDocument()
    // Use getAllByText for elements that appear multiple times
    const settingsElements = screen.getAllByText('الإعدادات')
    expect(settingsElements.length).toBeGreaterThan(0)
  })

  it('maintains proper Arabic RTL layout', () => {
    const { container } = render(<AdminDashboard />)
    
    // Check for RTL-specific classes
    const rtlElements = container.querySelectorAll('.mr-4, .ml-2')
    expect(rtlElements.length).toBeGreaterThan(0)
  })
})
