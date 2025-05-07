import React from "react";
import { CloudOff, Play, MessageCircle, Mic } from "react-feather";
import Button from "../ui/Button";
import ChatInput from "./ChatInput";

/**
 * セッションコントロールコンポーネント
 * セッションの開始・終了や入力コントロールを管理
 */
export default function SessionController({
  isSessionActive,
  status,
  startSession,
  stopSession,
  sendTextMessage
}) {
  const isConnecting = status === "connecting";
  const isListening = status === "listening";
  const isBusy = status === "sending" || isListening || isConnecting;
  
  // セッション未開始時
  if (!isSessionActive) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2 py-2">
        <Button
          onClick={startSession}
          variant={isConnecting ? "secondary" : "primary"}
          disabled={isConnecting}
          icon={isConnecting ? <MessageCircle size={20} className="animate-pulse" /> : <Play size={20} />}
          size="lg"
          fullWidth
        >
          {isConnecting ? "接続処理中..." : "会話を開始する"}
        </Button>
        <p className="text-xs" style={{color: "var(--color-text-secondary)", opacity: 0.8}}>
          ボタンをタップしてAIとの会話を始めます。
        </p>
      </div>
    );
  }
  
  // セッション開始時
  return (
    <div className="flex items-center w-full gap-2">
      <div className="flex-1">
        <ChatInput 
          onSendMessage={sendTextMessage} 
          disabled={isBusy}
          placeholder={isListening ? "聞き取り中..." : "メッセージを入力..."}
        />
      </div>
      
      <Button 
        onClick={stopSession} 
        variant="secondary"
        size="icon"
        disabled={isConnecting}
        className="p-3"
        icon={<CloudOff size={22} />}
        aria-label="切断"
      />
    </div>
  );
}