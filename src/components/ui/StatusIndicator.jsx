import React from "react";
import { MessageCircle, Mic, Send, AlertCircle, Wifi, Zap } from "react-feather";

// ステータスメッセージとアイコンのマッピング
const statusConfig = {
  idle: { 
    message: null, 
    icon: null 
  },
  connecting: { 
    message: "接続中...", 
    icon: <Zap size={16} className="animate-pulse" />, 
    color: "var(--color-info)" 
  },
  connected: { 
    message: "接続完了", 
    icon: <Wifi size={16} />, 
    color: "var(--color-success)" 
  },
  listening: { 
    message: "聞き取り中...", 
    icon: <Mic size={16} className="animate-pulse" />, 
    color: "var(--color-primary)" 
  },
  sending: { 
    message: "送信中...", 
    icon: <Send size={16} className="animate-pulse"/>, 
    color: "var(--color-info)" 
  },
  responding: { 
    message: "AI応答中...", 
    icon: <MessageCircle size={16} className="animate-pulse" />, 
    color: "var(--color-success)" 
  },
  error: { 
    message: "エラー発生", 
    icon: <AlertCircle size={16} />, 
    color: "var(--color-danger)" 
  }
};

/**
 * 現在のステータスを表示するコンポーネント
 */
export default function StatusIndicator({ status }) {
  const currentStatus = statusConfig[status] || statusConfig.idle;
  
  if (!currentStatus.message) return null;
  
  return (
    <div className={`
      flex items-center justify-center gap-2 
      py-2 px-3 my-3 mx-auto 
      rounded-full bg-white text-sm shadow-sm
      border border-transparent
    `}
    style={{
      color: currentStatus.color || "var(--color-text-secondary)",
      backgroundColor: "var(--color-surface)",
      borderColor: currentStatus.color ? hexToRgba(currentStatus.color, 0.2) : "var(--color-border-light)"
    }}
    >
      {currentStatus.icon && React.cloneElement(currentStatus.icon, { style: { color: currentStatus.color } })}
      <span style={{ color: currentStatus.color || "var(--color-text-secondary)" }}>
        {currentStatus.message}
      </span>
    </div>
  );
}

// Helper function to convert hex to rgba for border transparency
function hexToRgba(hex, alpha) {
 if (!hex || typeof hex !== 'string') return null; // hexが不正な場合はnullを返す
 const r = parseInt(hex.slice(1, 3), 16);
 const g = parseInt(hex.slice(3, 5), 16);
 const b = parseInt(hex.slice(5, 7), 16);
 return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}