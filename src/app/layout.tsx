import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'Namecheap - Share Profit E-commerce Platform',
  description: 'A platform where we share profit with users through bulk buying, referrals, and discounts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
