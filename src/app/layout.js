import '@/styles/globals.css';

export const metadata = {
  title: 'カフェのシチュエーション',
  description: 'OpenAI Realtime Console',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  themeColor: '#ffffff',
  icons: {
    icon: '/assets/openai-logomark.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}