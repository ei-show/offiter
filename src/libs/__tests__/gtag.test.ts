describe('gtag.ts', () => {
  let gtagMock: jest.Mock

  beforeEach(() => {
    gtagMock = jest.fn()
    ;(window as any).gtag = gtagMock
    jest.resetModules()
  })

  afterEach(() => {
    delete (window as any).gtag
    delete process.env.GA_TRACKING_ID
  })

  describe('pageview', () => {
    it('does nothing when GA_TRACKING_ID is not set', () => {
      delete process.env.GA_TRACKING_ID
      const { pageview } = require('../gtag')
      pageview('/test-path')
      expect(gtagMock).not.toHaveBeenCalled()
    })

    it('calls window.gtag with config when GA_TRACKING_ID is set', () => {
      process.env.GA_TRACKING_ID = 'GA-TEST-123'
      const { pageview } = require('../gtag')
      pageview('/test-path')
      expect(gtagMock).toHaveBeenCalledWith('config', 'GA-TEST-123', {
        page_path: '/test-path',
      })
    })

    it('calls window.gtag with the correct URL', () => {
      process.env.GA_TRACKING_ID = 'GA-TEST-456'
      const { pageview } = require('../gtag')
      pageview('/blogs/my-post')
      expect(gtagMock).toHaveBeenCalledWith('config', 'GA-TEST-456', {
        page_path: '/blogs/my-post',
      })
    })
  })

  describe('event', () => {
    it('does nothing when GA_TRACKING_ID is not set', () => {
      delete process.env.GA_TRACKING_ID
      const { event } = require('../gtag')
      event({ action: 'click', category: 'button', label: 'test' })
      expect(gtagMock).not.toHaveBeenCalled()
    })

    it('calls window.gtag with event data when GA_TRACKING_ID is set', () => {
      process.env.GA_TRACKING_ID = 'GA-TEST-123'
      const { event } = require('../gtag')
      event({ action: 'click', category: 'button', label: 'test-label', value: 1 })
      expect(gtagMock).toHaveBeenCalledWith('event', 'click', {
        event_category: 'button',
        event_label: 'test-label',
        value: 1,
      })
    })

    it('calls window.gtag without value when value is omitted', () => {
      process.env.GA_TRACKING_ID = 'GA-TEST-123'
      const { event } = require('../gtag')
      event({ action: 'share', category: 'social', label: 'twitter' })
      expect(gtagMock).toHaveBeenCalledWith('event', 'share', {
        event_category: 'social',
        event_label: 'twitter',
        value: undefined,
      })
    })
  })

  describe('GA_TRACKING_ID export', () => {
    it('exports undefined when env var is not set', () => {
      delete process.env.GA_TRACKING_ID
      const { GA_TRACKING_ID } = require('../gtag')
      expect(GA_TRACKING_ID).toBeUndefined()
    })

    it('exports the tracking ID when env var is set', () => {
      process.env.GA_TRACKING_ID = 'GA-EXPORT-TEST'
      const { GA_TRACKING_ID } = require('../gtag')
      expect(GA_TRACKING_ID).toBe('GA-EXPORT-TEST')
    })
  })
})
