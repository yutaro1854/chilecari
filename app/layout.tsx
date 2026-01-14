import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chilecari Starter',
  description: 'Next.js + Tailwind starter with Supabase SSR.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-slate-50">
          <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-5 py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
