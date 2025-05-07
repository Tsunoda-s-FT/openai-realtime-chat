import React from "react";

/**
 * 全体レイアウトコンポーネント
 */
export default function Layout({ children, header }) {
  return (
    <div className="h-full-flex-col bg-background relative">
      {header}
      
      <main 
        className="flex-grow overflow-y-auto"
        style={{
          paddingTop: "var(--header-height)",
          paddingBottom: "var(--input-bar-height)",
          backgroundColor: "var(--color-background)"
        }}
      >
        {children} 
      </main>
      {/* ChatInputを含むSessionControllerがfixedで配置されることを想定 */}
    </div>
  );
}