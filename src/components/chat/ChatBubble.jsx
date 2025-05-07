import React from "react";
import { Cpu } from "react-feather";

/**
 * タイムスタンプを HH:mm 形式にフォーマットするヘルパー関数
 */
function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * チャットメッセージの吹き出しコンポーネント
 */
export default function ChatBubble({ message }) {
  const isUser = message.role === "user";
  const time = formatTimestamp(message.timestamp);
  
  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-1 group`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-end max-w-[90%]`}>
        {!isUser && (
          <Cpu 
            size={20} 
            className="mr-2 mb-1 flex-shrink-0" 
            style={{ color: "var(--color-secondary)" }} 
          />
        )}
        <div
          className={`
            px-3.5 py-2.5 
            rounded-xl shadow-sm transition-all duration-200 ease-out
            ${isUser 
              ? "bg-user-bubble text-slate-800 rounded-br-lg group-hover:shadow-md"
              : "bg-ai-bubble text-slate-800 rounded-bl-lg border border-slate-200 group-hover:shadow-md"
            }
          `}
          style={{
            backgroundColor: isUser ? "var(--color-user-bubble)" : "var(--color-ai-bubble)",
            color: "var(--color-text-primary)",
            borderRadius: isUser 
              ? "var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-sm) var(--border-radius-lg)" 
              : "var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-sm)",
            borderColor: "var(--color-border-light)"
          }}
        >
          <div className="whitespace-pre-wrap text-base leading-relaxed">
            {message.content}
          </div>
          
          {!isUser && message.transcript_status === "partial" && (
             <div className="mt-1.5 text-xs italic animate-pulse"
               style={{ color: "var(--color-text-secondary)", opacity: 0.7 }}>
               タイピング中...
             </div>
          )}
        </div>
      </div>
      {time && (
        <div 
          className={`text-xs mt-0.5 ${isUser ? "mr-1" : "ml-8" }`}
          style={{ color: "var(--color-text-secondary)", opacity: 0.8 }}
        >
          {time}
        </div>
      )}
    </div>
  );
}