import React, { forwardRef } from "react";

/**
 * テキスト入力フィールドコンポーネント
 */
const TextInput = forwardRef(({ 
  value, 
  onChange, 
  placeholder = "", 
  disabled = false, 
  onKeyDown,
  className = "",
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className={`
        w-full px-4 py-3 
        border rounded-full
        text-base
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 
        ${className}
      `}
      style={{
        backgroundColor: disabled ? "var(--color-background-alt)" : "var(--color-surface)",
        color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        borderColor: "var(--color-border)",
        borderRadius: "var(--border-radius-full)", 
        placeholderColor: "var(--color-text-placeholder)",
        opacity: disabled ? 0.6 : 1,
        boxShadow: disabled ? "none" : "0 1px 2px 0 rgba(0,0,0,0.03)",
        lineHeight: '1.5', // Ensure text is vertically centered
      }}
      placeholder={placeholder}
      disabled={disabled}
      onKeyDown={onKeyDown}
      value={value}
      onChange={onChange}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--color-border-focus)";
        e.target.style.boxShadow = `0 0 0 2px var(--color-primary-light), 0 1px 2px 0 rgba(0,0,0,0.03)`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--color-border)";
        e.target.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.03)";
      }}
      {...props}
    />
  );
});

TextInput.displayName = "TextInput";

export default TextInput;