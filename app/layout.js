import './globals.css'

export const metadata = {
  title: 'Campfire Chat',
  description: 'Gather around the light and share.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}