import React, { useRef, useEffect } from "react";
import { MessageSquare, Coffee } from "react-feather";
import ChatBubble from "./ChatBubble";
import StatusIndicator from "../ui/StatusIndicator";

/**
 * チャットメッセージと状態を表示するコンテナ
 */
export default function ChatContainer({ messages, status }) {
  const containerRef = useRef(null);

  // 新しいメッセージが来たら自動スクロール
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, status]);

  return (
    <div 
      ref={containerRef}
      className="chat-area-container px-4 py-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {messages.length === 0 && status !== "connecting" && status !== "connected" && status !== "listening" ? (
        // メッセージがなく、特定のステータスでもない場合のプレースホルダー
        <div 
         className="flex flex-col items-center justify-center h-full text-center"
         style={{color: "var(--color-text-secondary)", opacity: 0.8}}
        >
          <Coffee size={48} className="mb-4" style={{color: "var(--color-secondary-light)"}} />
          <h2 className="text-xl font-semibold mb-1" style={{color: "var(--color-text-primary)"}}>会話をはじめましょう</h2>
          <p className="text-sm max-w-xs">
            下のボタンからAIとの会話セッションを開始できます。
            カフェでの会話をシミュレートします。
          </p>
        </div>
      ) : (
        // メッセージリスト
        <div className="flex flex-col pt-2">
          {messages.map((message, index) => (
            <ChatBubble 
              key={`${message.item_id || index}-${message.timestamp || Date.now()}`}
              message={message} 
            />
          ))}
          
          {/* 現在のステータス表示 (メッセージがある時も表示) */}
          <StatusIndicator status={status} />
        </div>
      )}
    </div>
  );
}