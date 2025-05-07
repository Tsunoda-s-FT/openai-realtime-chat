'use client';

import React from "react";
import Layout from "@/components/Layout";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";
import SessionController from "@/components/chat/SessionController";
import useRealtime from "@/hooks/useRealtime";

/**
 * チャットページコンポーネント
 */
export default function ChatPage() {
  const {
    isSessionActive,
    messages,
    status,
    startSession,
    stopSession,
    sendTextMessage
  } = useRealtime();

  return (
    <Layout
      header={<ChatHeader />}
    >
      {/* チャットコンテナ */}
      <ChatContainer 
        messages={messages} 
        status={status} 
      />
      
      {/* 入力コントロールエリア */}
      <div 
        className="fixed-container bottom-0 z-20 p-3 safe-bottom"
        style={{ 
          backgroundColor: "var(--color-surface)",
          borderTop: `1px solid var(--color-border-light)`,
          boxShadow: "0 -2px 5px rgba(0,0,0,0.03)"
        }}
      >
        <div className="max-w-2xl mx-auto"> {/* 中央揃えのためのコンテナ */}
          <SessionController
            isSessionActive={isSessionActive}
            status={status}
            startSession={startSession}
            stopSession={stopSession}
            sendTextMessage={sendTextMessage}
          />
        </div>
      </div>
    </Layout>
  );
}