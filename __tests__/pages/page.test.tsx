import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminDashboard from '../../app/page'

// Mock the Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Mock Date to have consistent time in tests
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-01-15 10:30:00'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the main dashboard elements', () => {
    render(<AdminDashboard />)
    
    // Check for main title
    expect(screen.getByText('لوحة التحكم')).toBeInTheDocument()
    
    // Check for welcome banner
    expect(screen.getByText('مرحباً بك في لوحة التحكم')).toBeInTheDocument()
    expect(screen.getByText('إدارة شاملة لجميع جوانب منصة نائبك.كوم')).toBeInTheDocument()
  })

  it('displays statistics cards with correct data', () => {
    render(<AdminDashboard />)
    
    // Check for statistics cards
    expect(screen.getByText('إجمالي الشكاوى')).toBeInTheDocument()
    expect(screen.getByText('1,247')).toBeInTheDocument()
    
    expect(screen.getByText('المستخدمين النشطين')).toBeInTheDocument()
    expect(screen.getByText('8,392')).toBeInTheDocument()
    
    expect(screen.getByText('الرسائل اليوم')).toBeInTheDocument()
    expect(screen.getByText('156')).toBeInTheDocument()
    
    expect(screen.getByText('متوسط التقييمات')).toBeInTheDocument()
    expect(screen.getByText('4.7')).toBeInTheDocument()
  })

  it('shows recent activities', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('الأنشطة الأخيرة')).toBeInTheDocument()
    expect(screen.getByText('شكوى جديدة من أحمد محمد')).toBeInTheDocument()
    expect(screen.getByText('تقييم جديد للنائب سارة أحمد')).toBeInTheDocument()
  })

  it('displays additional statistics', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('زوار اليوم')).toBeInTheDocument()
    expect(screen.getByText('2,847')).toBeInTheDocument()
    
    expect(screen.getByText('الأخبار المنشورة')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
    
    expect(screen.getByText('معدل الاستجابة')).toBeInTheDocument()
    expect(screen.getByText('94%')).toBeInTheDocument()
  })

  it('shows the chart component', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('إحصائيات الزوار')).toBeInTheDocument()
  })

  it('has settings button that is clickable', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<AdminDashboard />)
    
    const settingsButton = screen.getByRole('button', { name: /الإعدادات/ })
    expect(settingsButton).toBeInTheDocument()
    
    await user.click(settingsButton)
    // Since there's no actual functionality, we just test that it's clickable
    expect(settingsButton).toBeInTheDocument()
  })

  it('displays the footer with correct links', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('© 2024 نائبك.كوم. جميع الحقوق محفوظة.')).toBeInTheDocument()
    expect(screen.getByText('الدعم الفني')).toBeInTheDocument()
    expect(screen.getByText('التوثيق')).toBeInTheDocument()
  })

  it('renders the logo image', () => {
    render(<AdminDashboard />)
    
    const logo = screen.getByAltText('نائبك.كوم')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/logo-naebak-green.png')
  })

  it('displays time information', () => {
    render(<AdminDashboard />)
    
    // Check that some time-related content exists
    const timeContainer = screen.getByText(/2024/)
    expect(timeContainer).toBeInTheDocument()
  })
})
