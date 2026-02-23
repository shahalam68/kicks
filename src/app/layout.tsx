import NavBar from '@/components/Header/NavBar';
import Footer from '@/components/shared/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ReduxProvider } from '@/redux/provider';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kicks - Premium Footwear',
  description: 'Scalable foundation for professional footwear retail.',
  icons: {
    icon: '/KicksLogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            forcedTheme="light"
          >
            <NavBar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
