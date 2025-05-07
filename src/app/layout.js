import '@/styles/globals.css';

export const metadata = {
  title: 'カフェのシチュエーション',
  description: 'OpenAI Realtime Console',
  icons: {
    icon: '/assets/openai-logomark.svg',
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
    themeColor: '#FFFFFF',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="h-full-flex-col">{children}</body>
    </html>
  );
}