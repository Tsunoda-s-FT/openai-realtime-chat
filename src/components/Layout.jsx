import React from "react";

/**
 * 全体レイアウトコンポーネント
 */
export default function Layout({ children, header, footer }) {
  return (
    <div className="h-full-flex-col bg-background relative">
      {header}
      
      <main 
        className="flex-grow overflow-y-auto"
        style={{
          paddingTop: "var(--header-height)",
          paddingBottom: footer ? "var(--input-bar-height)" : "0px",
          backgroundColor: "var(--color-background)"
        }}
      >
        {children} 
      </main>
      {footer && (
        <div
          className="z-20 w-full"
          style={{
            backgroundColor: "var(--color-surface)",
            borderTop: `1px solid var(--color-border-light)`,
            boxShadow: "0 -2px 5px rgba(0,0,0,0.03)",
          }}
        >
          {footer} 
        </div>
      )}
    </div>
  );
}