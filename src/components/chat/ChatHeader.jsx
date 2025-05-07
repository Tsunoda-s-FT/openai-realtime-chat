import React from "react";
import Image from "next/image";

/**
 * チャットヘッダーコンポーネント (段階的再構築)
 */
export default function ChatHeader({ title = "カフェのシチュエーション" }) {
  return (
    <header 
      style={{
        // fixed-container の代替
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        // 元のスタイル（一部固定値でテスト）
        height: '56px', // var(--header-height) の代わり
        backgroundColor: 'var(--color-surface)', // CSS変数を試す（問題なければ元のまま）
        borderBottom: `1px solid var(--color-border)`,
        // Flexbox関連のスタイル (Tailwindクラスの代わり)
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px', // gap-3 px-3 に相当するパディング (12px)
        boxSizing: 'border-box',
      }}
    >
      <Image 
        src="/assets/openai-logomark.svg" 
        alt="OpenAI Logo" 
        width={24}
        height={24}
        style={{ flexShrink: 0 }} // className="flex-shrink-0" の代わり
      />
      <h1 
        style={{
          // grow min-w-0 truncate text-xs sm:text-sm md:text-base font-semibold の代替
          flexGrow: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: '14px', // sm:text-sm に近い固定値でまずテスト
          fontWeight: '600', // font-semibold
          color: 'var(--color-text-primary)', // CSS変数を試す
          marginLeft: '8px', // gap-2相当のマージン
        }}
        title={title}
      >
        {title}
      </h1>
    </header>
  );
}
