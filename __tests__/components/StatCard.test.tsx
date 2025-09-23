import { render, screen } from '@testing-library/react'
import { ChartBarIcon } from '@heroicons/react/24/outline'

// Extract StatCard component for testing
interface StatCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

const StatCard = ({ title, value, change, changeType, icon, color }: StatCardProps) => {
  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500', 
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  return (
    <div className="naebak-card">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg ${colorClasses[color]} text-white`}>
          {icon}
        </div>
        <div className="mr-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-1">
            <span className={`text-sm mr-1 ${
              changeType === 'increase' ? 'text-green-600' : 
              changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

describe('StatCard Component', () => {
  const defaultProps: StatCardProps = {
    title: 'Test Title',
    value: '1,234',
    change: '+10%',
    changeType: 'increase' as const,
    icon: <ChartBarIcon className="w-6 h-6" />,
    color: 'primary' as const,
  }

  it('renders with all required props', () => {
    render(<StatCard {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('+10%')).toBeInTheDocument()
  })

  it('applies correct color class for primary color', () => {
    const { container } = render(<StatCard {...defaultProps} color="primary" />)
    
    const iconContainer = container.querySelector('.bg-primary-500')
    expect(iconContainer).toBeInTheDocument()
  })

  it('applies correct color class for error color', () => {
    const { container } = render(<StatCard {...defaultProps} color="error" />)
    
    const iconContainer = container.querySelector('.bg-red-500')
    expect(iconContainer).toBeInTheDocument()
  })

  it('applies correct text color for increase change type', () => {
    const { container } = render(<StatCard {...defaultProps} changeType="increase" />)
    
    const changeText = container.querySelector('.text-green-600')
    expect(changeText).toBeInTheDocument()
    expect(changeText).toHaveTextContent('+10%')
  })

  it('applies correct text color for decrease change type', () => {
    const { container } = render(
      <StatCard {...defaultProps} changeType="decrease" change="-5%" />
    )
    
    const changeText = container.querySelector('.text-red-600')
    expect(changeText).toBeInTheDocument()
    expect(changeText).toHaveTextContent('-5%')
  })

  it('applies correct text color for neutral change type', () => {
    const { container } = render(
      <StatCard {...defaultProps} changeType="neutral" change="ثابت" />
    )
    
    const changeText = container.querySelector('.text-gray-600')
    expect(changeText).toBeInTheDocument()
    expect(changeText).toHaveTextContent('ثابت')
  })

  it('renders with numeric value', () => {
    render(<StatCard {...defaultProps} value={5678} />)
    
    expect(screen.getByText('5678')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    const { container } = render(<StatCard {...defaultProps} />)
    
    // Check if the icon is rendered (ChartBarIcon should be present)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('has proper structure with naebak-card class', () => {
    const { container } = render(<StatCard {...defaultProps} />)
    
    const cardElement = container.querySelector('.naebak-card')
    expect(cardElement).toBeInTheDocument()
  })
})
