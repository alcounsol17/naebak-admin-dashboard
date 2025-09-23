import { render } from '@testing-library/react'
import RootLayout from '../../app/layout'

// Mock Next.js font
jest.mock('next/font/google', () => ({
  Cairo: () => ({
    className: 'mocked-cairo-font',
    variable: '--font-cairo',
  }),
}))

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>
    
    const { getByTestId } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    expect(getByTestId('test-child')).toBeInTheDocument()
  })

  it('has correct HTML structure', () => {
    const TestChild = () => <div>Test</div>
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const htmlElement = container.querySelector('html')
    expect(htmlElement).toHaveAttribute('lang', 'ar')
    expect(htmlElement).toHaveAttribute('dir', 'rtl')
  })

  it('includes the root div with correct id', () => {
    const TestChild = () => <div>Test</div>
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const rootDiv = container.querySelector('#root')
    expect(rootDiv).toBeInTheDocument()
    expect(rootDiv).toHaveClass('min-h-screen')
  })

  it('applies correct body classes', () => {
    const TestChild = () => <div>Test</div>
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const bodyElement = container.querySelector('body')
    expect(bodyElement).toHaveClass('antialiased', 'bg-gray-50', 'text-gray-900')
  })

  it('includes security meta tags', () => {
    const TestChild = () => <div>Test</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    // Check if security meta tags are present in the head
    const xContentTypeOptions = document.querySelector('meta[http-equiv="X-Content-Type-Options"]')
    expect(xContentTypeOptions).toBeInTheDocument()
    expect(xContentTypeOptions).toHaveAttribute('content', 'nosniff')
    
    const xFrameOptions = document.querySelector('meta[http-equiv="X-Frame-Options"]')
    expect(xFrameOptions).toBeInTheDocument()
    expect(xFrameOptions).toHaveAttribute('content', 'DENY')
    
    const xXSSProtection = document.querySelector('meta[http-equiv="X-XSS-Protection"]')
    expect(xXSSProtection).toBeInTheDocument()
    expect(xXSSProtection).toHaveAttribute('content', '1; mode=block')
  })

  it('includes preconnect links for fonts', () => {
    const TestChild = () => <div>Test</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const googleFontsPreconnect = document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')
    expect(googleFontsPreconnect).toBeInTheDocument()
    
    const gstaticPreconnect = document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')
    expect(gstaticPreconnect).toBeInTheDocument()
  })

  it('includes DNS prefetch links', () => {
    const TestChild = () => <div>Test</div>
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const googleFontsDNS = document.querySelector('link[rel="dns-prefetch"][href="//fonts.googleapis.com"]')
    expect(googleFontsDNS).toBeInTheDocument()
    
    const gstaticDNS = document.querySelector('link[rel="dns-prefetch"][href="//fonts.gstatic.com"]')
    expect(gstaticDNS).toBeInTheDocument()
  })

  it('includes inline scripts for performance and error tracking', () => {
    const TestChild = () => <div>Test</div>
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    )
    
    const scripts = container.querySelectorAll('script')
    expect(scripts.length).toBeGreaterThan(0)
    
    // Check if the script contains service worker registration
    const scriptContent = Array.from(scripts).find(script => 
      script.innerHTML.includes('serviceWorker')
    )
    expect(scriptContent).toBeTruthy()
  })
})
