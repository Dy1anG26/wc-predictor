import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WC Predictor | Vicinity Media',
  description: 'FIFA World Cup 2026 Score Predictor',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
