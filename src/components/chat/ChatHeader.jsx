import React from "react";
import Image from "next/image";

/**
 * チャットヘッダーコンポーネント
 */
export default function ChatHeader({ title = "カフェのシチュエーション" }) {
  return (
    <header className="fixed-container top-0 h-14 flex items-center border-b border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 px-4 w-full">
        <Image 
          src="/assets/openai-logomark.svg" 
          alt="OpenAI Logo" 
          width={24} 
          height={24} 
        />
        <h1 className="text-lg font-medium text-slate-800 truncate">
          {title}
        </h1>
      </div>
    </header>
  );
}