import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Factory Database',
  description: 'Database lab project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}