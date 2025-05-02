// components/FacebookPixelTracker.tsx
'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq: any
  }
}

export default function FacebookPixelTracker() {
  useEffect(() => {
    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement
      if(form.id === 'order-form') {
        window.fbq('track', 'Purchase', {
          value: 0.00, // Replace with actual value
          currency: 'BDT',
          contents: [{
            id: 'order_id', // Add actual order ID
            quantity: 1
          }],
          content_type: 'product'
        })
      }
    }

    // Add event listener for form submission
    document.addEventListener('submit', handleSubmit)

    return () => {
      document.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return null
}
