// Utility functions for testing
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ar-EG').format(num)
}

export const formatDate = (date: Date): string => {
  return date.toLocaleString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const getChangeType = (change: string): 'increase' | 'decrease' | 'neutral' => {
  if (change.startsWith('+')) return 'increase'
  if (change.startsWith('-')) return 'decrease'
  return 'neutral'
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

describe('Utility Functions', () => {
  describe('formatNumber', () => {
    it('formats numbers correctly in Arabic locale', () => {
      expect(formatNumber(1234)).toBe('١٬٢٣٤')
      expect(formatNumber(5678)).toBe('٥٬٦٧٨')
      expect(formatNumber(0)).toBe('٠')
    })

    it('handles large numbers', () => {
      expect(formatNumber(1000000)).toBe('١٬٠٠٠٬٠٠٠')
    })

    it('handles negative numbers', () => {
      const result = formatNumber(-123)
      expect(result).toContain('١٢٣')
      expect(result).toContain('-')
    })
  })

  describe('formatDate', () => {
    it('formats date correctly in Arabic locale', () => {
      const testDate = new Date('2024-01-15T10:30:00')
      const formatted = formatDate(testDate)
      
      expect(formatted).toContain('الاثنين')
      expect(formatted).toContain('٢٠٢٤')
      expect(formatted).toContain('يناير')
    })

    it('includes time in the formatted string', () => {
      const testDate = new Date('2024-01-15T14:45:00')
      const formatted = formatDate(testDate)
      
      // Check for time components (Arabic numerals)
      expect(formatted).toMatch(/\d{1,2}:\d{2}/)
    })
  })

  describe('getChangeType', () => {
    it('returns increase for positive changes', () => {
      expect(getChangeType('+10%')).toBe('increase')
      expect(getChangeType('+5')).toBe('increase')
      expect(getChangeType('+0.5%')).toBe('increase')
    })

    it('returns decrease for negative changes', () => {
      expect(getChangeType('-10%')).toBe('decrease')
      expect(getChangeType('-5')).toBe('decrease')
      expect(getChangeType('-0.5%')).toBe('decrease')
    })

    it('returns neutral for neutral changes', () => {
      expect(getChangeType('ثابت')).toBe('neutral')
      expect(getChangeType('0%')).toBe('neutral')
      expect(getChangeType('لا تغيير')).toBe('neutral')
    })
  })

  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('admin@naebak.com')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('test.domain.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })

    it('handles edge cases', () => {
      expect(validateEmail('test@domain')).toBe(false)
      expect(validateEmail('test space@domain.com')).toBe(false)
      expect(validateEmail('test@@domain.com')).toBe(false)
    })
  })
})
