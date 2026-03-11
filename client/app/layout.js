import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export const metadata = {
  title: 'Xplore',
  description: 'Discover unique travel experiences',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}