import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MSWComponent } from './_component/MSWcomponent';
import AuthSession from './_component/AuthSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Z.COM클론코딩',
  description: 'Generated by create next app',
};

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent />
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
