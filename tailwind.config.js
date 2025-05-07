// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          light: '#93c5fd',
        },
        secondary: {
          DEFAULT: '#64748b',
          dark: '#475569',
          light: '#94a3b8',
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        success: '#10b981',
        warning: '#f59e0b',
        info: '#3b82f6', // --color-info と --color-primary が同じ値
        
        background: '#f8fafc',
        'background-alt': '#f1f5f9',
        
        surface: '#ffffff',
        'user-bubble': '#e1f5fe',
        'ai-bubble': '#f5f7f9',
        
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        'text-placeholder': '#94a3b8',
        'text-disabled': '#cbd5e1',
        'text-link': '#2563eb',
        'text-light': '#f8fafc',
        
        border: '#e2e8f0',
        'border-light': '#f1f5f9',
        'border-focus': '#3b82f6',
      },
      fontFamily: {
        base: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',   // 12px
        sm: '0.875rem',  // 14px
        base: '1rem',    // 16px
        lg: '1.125rem',  // 18px
        xl: '1.25rem',   // 20px
      },
      spacing: {
        // Tailwindのデフォルトと大きく変わらないものはコメントアウトも検討
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      height: {
        'header': '3.5rem',
        'input-bar': '4.5rem',
      },
      maxWidth: {
        'chat': '48rem',
      }
    },
  },
  plugins: [],
};