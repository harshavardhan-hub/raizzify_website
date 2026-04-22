import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ModalProvider } from '@/components/ModalContext';

export const metadata: Metadata = {
  title: 'Raizzify | The Definitive Platform',
  description: 'Shape your next digital venture with Raizzify.',
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
