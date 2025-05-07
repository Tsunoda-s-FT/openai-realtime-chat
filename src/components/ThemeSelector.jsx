import React from 'react';
// Button コンポーネントは直接使用せず、divをクリック可能にする

/**
 * 会話テーマ選択コンポーネント
 */
export default function ThemeSelector({ themes, onSelectTheme, isLoading }) {
  if (!themes || Object.keys(themes).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-slate-600 mb-4">利用可能な会話テーマがありません。</p>
        <p className="text-sm text-slate-500">
          <code>public/config/instructions.json</code> を確認してください。
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-full p-6 pt-8 sm:pt-12 bg-slate-50">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-8 sm:mb-10 text-center select-none">
        会話テーマを選んでください
      </h2>

      <div className="grid gap-5 w-full max-w-4xl px-2"
           style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {Object.entries(themes).map(([themeKey]) => (
          <button
            key={themeKey}
            type="button"
            disabled={isLoading}
            onClick={() => !isLoading && onSelectTheme(themeKey)}
            className={`
              group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow hover:shadow-md 
              active:scale-[0.98] transition-transform duration-200 ease-out w-full text-center max-w-md mx-auto
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}
            `}
            style={{ padding: '1.5rem 1rem' }}
          >
            {/* アニメーション用の背景ブラー */}
            <span
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* テーマ名 */}
            <span className="relative z-10 block text-lg font-semibold text-slate-800 group-hover:text-blue-600 truncate">
              {themeKey}
            </span>
            {/* サブ説明（例示用。ここでは固定文言） */}
            <span className="relative z-10 mt-2 block text-xs text-slate-500">
              タップして開始
            </span>
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="mt-10 text-slate-500 animate-pulse">テーマを読み込んでいます...</p>
      )}
    </div>
  );
} 