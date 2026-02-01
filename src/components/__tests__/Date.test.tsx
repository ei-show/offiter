/**
 * Unit tests for Date.tsx
 * Tests date formatting utility function
 */

import Date from '../Date'

describe('Date.tsx', () => {
  describe('Date formatter', () => {
    it('formats valid ISO date string correctly', () => {
      // Arrange
      const isoDate = '2024-01-15T10:30:00.000Z'

      // Act
      const result = Date(isoDate)

      // Assert
      expect(result).toBe('2024年01月15日')
    })

    it('formats date with timezone consideration', () => {
      // Arrange
      const isoDate = '2023-12-31T23:59:59.999Z'

      // Act
      const result = Date(isoDate)

      // Assert - May be affected by timezone
      expect(result).toMatch(/2023年12月31日|2024年01月01日/)
    })

    it('handles January dates', () => {
      // Arrange
      const isoDate = '2024-01-01T00:00:00.000Z'

      // Act
      const result = Date(isoDate)

      // Assert
      expect(result).toBe('2024年01月01日')
    })

    it('handles December dates', () => {
      // Arrange
      const isoDate = '2024-12-25T12:00:00.000Z'

      // Act
      const result = Date(isoDate)

      // Assert
      expect(result).toBe('2024年12月25日')
    })

    it('pads single-digit months with zero', () => {
      // Arrange
      const isoDate = '2024-03-05T00:00:00.000Z'

      // Act
      const result = Date(isoDate)

      // Assert
      expect(result).toContain('03月')
      expect(result).toContain('05日')
    })

    it('handles leap year February', () => {
      // Arrange
      const isoDate = '2024-02-29T00:00:00.000Z'

      // Act
      const result = Date(isoDate)

      // Assert
      expect(result).toBe('2024年02月29日')
    })

    it('returns consistent format for same date', () => {
      // Arrange
      const isoDate = '2024-07-20T00:00:00.000Z'

      // Act
      const result1 = Date(isoDate)
      const result2 = Date(isoDate)

      // Assert
      expect(result1).toBe(result2)
    })
  })
})
