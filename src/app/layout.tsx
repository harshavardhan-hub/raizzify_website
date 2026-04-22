import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ModalProvider } from '@/components/ModalContext';

export const metadata: Metadata = {
  title: {
    default: 'Raizzify | Architecting Your Digital Empire',
    template: '%s | Raizzify'
  },
  description: 'Shape your next digital venture with Raizzify. We provide elite engineering, business growth automation, and frictionless event ticketing solutions.',
  keywords: ['Raizzify', 'Business Automation', 'Event Ticketing', 'Tech Product Development', 'Digital Solutions', 'Startups', 'Software Engineering'],
  authors: [{ name: 'Raizzify' }],
  creator: 'Raizzify',
  publisher: 'Raizzify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Raizzify',
    title: 'Raizzify | Architecting Your Digital Empire',
    description: 'Shape your next digital venture with Raizzify. We provide elite engineering, business growth automation, and frictionless event ticketing solutions.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Raizzify - Architecting Your Digital Empire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raizzify | Architecting Your Digital Empire',
    description: 'Shape your next digital venture with Raizzify. We provide elite engineering, business growth automation, and frictionless event ticketing solutions.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden w-full max-w-[100vw]">
        <ClientProviders>
          <ModalProvider>
            <Navbar />
            <main className="min-h-screen w-full overflow-x-clip">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </ModalProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
