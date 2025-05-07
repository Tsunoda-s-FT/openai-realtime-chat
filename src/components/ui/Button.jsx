import React from "react";

/**
 * 汎用ボタンコンポーネント
 */
export default function Button({ 
  children, 
  icon, 
  onClick, 
  variant = "primary", 
  size = "default",
  disabled = false,
  fullWidth = false, 
  className = "",
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";
  
  // バリアント別スタイル (CSS変数を使用)
  const variantStyles = {
    primary: {
      backgroundColor: disabled ? "var(--color-primary-light)" : "var(--color-primary)",
      color: "var(--color-text-light)",
      focusRingColor: "var(--color-primary-light)",
      hoverBackgroundColor: "var(--color-primary-dark)",
      boxShadow: "0 2px 4px -1px rgba(0,122,255,0.2), 0 4px 5px 0 rgba(0,122,255,0.14), 0 1px 10px 0 rgba(0,122,255,0.12)"
    },
    secondary: {
      backgroundColor: disabled ? "var(--color-secondary-light)" : "var(--color-secondary)",
      color: "var(--color-text-light)",
      focusRingColor: "var(--color-secondary-light)",
      hoverBackgroundColor: "var(--color-secondary-dark)",
      boxShadow: "0 2px 4px -1px rgba(142,142,147,0.2), 0 4px 5px 0 rgba(142,142,147,0.14), 0 1px 10px 0 rgba(142,142,147,0.12)"
    },
    danger: {
      backgroundColor: disabled ? "var(--color-danger-light)" : "var(--color-danger)", // --color-danger-light が未定義なので注意
      color: "var(--color-text-light)",
      focusRingColor: "var(--color-danger-light)",
      hoverBackgroundColor: "var(--color-danger-dark)",
      boxShadow: "0 2px 4px -1px rgba(255,59,48,0.2), 0 4px 5px 0 rgba(255,59,48,0.14), 0 1px 10px 0 rgba(255,59,48,0.12)"
    },
    ghost: {
      backgroundColor: "transparent",
      color: disabled ? "var(--color-text-disabled)" : "var(--color-primary)",
      focusRingColor: "var(--color-primary-light)",
      hoverBackgroundColor: "rgba(0, 122, 255, 0.1)", // Primary color with alpha
      border: `1px solid ${disabled ? "var(--color-border-light)" : "var(--color-primary)"}`
    }
  };
  
  // サイズ別スタイル (CSS変数を使用)
  const sizeStyles = {
    sm: `text-sm px-3 py-1.5 gap-1.5`,
    default: `text-base px-4 py-2.5 gap-2`,
    lg: `text-lg px-5 py-3 gap-2.5`,
    icon: `p-2.5` // アイコンのみ
  };
  
  const currentVariantStyle = variantStyles[variant] || variantStyles.primary;
  const currentSizeStyle = sizeStyles[size] || sizeStyles.default;

  const disabledClasses = disabled 
    ? "opacity-60 cursor-not-allowed pointer-events-none" 
    : "hover:shadow-md";
  
  const widthClasses = fullWidth ? "w-full" : "";
  
  const combinedClasses = `
    ${baseClasses}
    ${currentSizeStyle}
    ${disabledClasses}
    ${widthClasses}
    ${className}
  `;

  return (
    <button
      className={combinedClasses.trim()}
      style={{
        backgroundColor: currentVariantStyle.backgroundColor,
        color: currentVariantStyle.color,
        borderRadius: "var(--border-radius-full)", // 全てのボタンを角丸に
        boxShadow: disabled ? 'none' : currentVariantStyle.boxShadow || "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px 0 rgba(0,0,0,0.04)",
        borderColor: currentVariantStyle.border ? currentVariantStyle.border.split(' ')[2] : 'transparent', // for ghost
        borderWidth: currentVariantStyle.border ? '1px' : '0',
        borderStyle: currentVariantStyle.border ? 'solid' : 'none',
      }}
      onClick={onClick}
      disabled={disabled}
      type="button"
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = currentVariantStyle.hoverBackgroundColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = currentVariantStyle.backgroundColor;
        }
      }}
      onFocus={(e) => {
       if (!disabled) {
         e.currentTarget.style.boxShadow = `0 0 0 3px ${currentVariantStyle.focusRingColor}, ${currentVariantStyle.boxShadow || "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px 0 rgba(0,0,0,0.04)"}`;
       }
      }}
      onBlur={(e) => {
       if (!disabled) {
         e.currentTarget.style.boxShadow = currentVariantStyle.boxShadow || "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px 0 rgba(0,0,0,0.04)";
       }
      }}
      {...props}
    >
      {icon && <span className={`flex-shrink-0 ${children ? (size === 'sm' ? 'mr-1' : 'mr-1.5') : ''}`}>{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
}