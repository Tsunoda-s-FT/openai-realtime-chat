'use client';

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";
import SessionController from "@/components/chat/SessionController";
import ThemeSelector from "@/components/ThemeSelector";
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
    sendTextMessage,
    currentTheme
  } = useRealtime();

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [availableThemes, setAvailableThemes] = useState({});
  const [isLoadingThemes, setIsLoadingThemes] = useState(true);

  // テーマリストを読み込む
  useEffect(() => {
    async function fetchThemes() {
      setIsLoadingThemes(true);
      try {
        // publicディレクトリにファイルを移動した場合のパス
        // Next.jsでは通常、静的ファイルはpublicに置き、fetchでアクセスします
        // ここでは、簡単のため、config/instructions.json を直接参照する代わりに
        // その内容を模したデータを直接定義するか、別途APIエンドポイントを作成することを推奨します。
        // 今回はデモのため、ビルド時に public にコピーされる想定で fetch します。
        // 実際には、APIルート経由でテーマリストを取得するのがより堅牢です。
        const response = await fetch('/config/instructions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch themes');
        }
        const data = await response.json();
        setAvailableThemes(data.themes || {});
      } catch (error) {
        console.error("テーマの読み込みに失敗しました:", error);
        setAvailableThemes({}); // エラー時は空にする
      }
      setIsLoadingThemes(false);
    }
    fetchThemes();
  }, []);

  const handleThemeSelect = (themeName) => {
    setSelectedTheme(themeName);
    // テーマが選択されたら、useRealtimeフックのstartSessionを呼び出す
    // useRealtimeフック側でメッセージクリアなどを行うので、ここではテーマ名を渡すだけ
    startSession(themeName); 
  };

  // セッションが停止されたらテーマ選択画面に戻る
  useEffect(() => {
    if (!isSessionActive && status === 'idle' && selectedTheme && !currentTheme) {
      // This case implies a session was active for selectedTheme, then stopped, and currentTheme was cleared.
      // We might want to reset selectedTheme to go back to ThemeSelector.
      // setSelectedTheme(null); // Uncomment to go back to theme selection after stopSession
    }
  }, [isSessionActive, status, selectedTheme, currentTheme]);

  const inputArea = (
    <div 
      className="max-w-xl w-full mx-auto px-4"
      style={{ 
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 20px)`
      }}
    >
      <SessionController
        isSessionActive={isSessionActive}
        status={status}
        startSession={() => selectedTheme && startSession(selectedTheme)}
        stopSession={() => {
          stopSession();
          setSelectedTheme(null); // Go back to theme selection on stop
        }}
        sendTextMessage={sendTextMessage}
      />
    </div>
  );

  // Determine what to show in the main content area and as footer
  let mainContent = null;
  let footerContent = null;

  if (!selectedTheme && !isSessionActive) {
    // Theme selection screen
    mainContent = (
      <ThemeSelector 
        themes={availableThemes} 
        onSelectTheme={handleThemeSelect} 
        isLoading={isLoadingThemes || status === 'connecting'} 
      />
    );
    // No footer on theme selection screen
  } else {
    // Chat screen (either connecting, active, or just selected a theme)
    mainContent = (
      <ChatContainer 
        messages={messages} 
        status={status} 
      />
    );
    footerContent = inputArea;
  }

  return (
    <Layout
      header={<ChatHeader title={currentTheme || selectedTheme || "テーマを選択"} />}
      footer={footerContent}
    >
      {mainContent}
    </Layout>
  );
}