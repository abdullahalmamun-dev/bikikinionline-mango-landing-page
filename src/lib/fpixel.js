// src/lib/fpixel.js
export const FB_PIXEL_ID = 'YOUR_PIXEL_ID';

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Standard events: https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking
export const event = (name, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Custom events
export const customEvent = (name, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, options);
  }
};
