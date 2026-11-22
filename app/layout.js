import './globals.css'

export const metadata = {
  title: 'AI Dubbing Auto Voice',
  description: 'High-Speed Khmer Dubbing (Up to 10+ Mins)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <body>{children}</body>
    </html>
  )
}