import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return getSystemTheme();
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#111' : '#fafafa';
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        position: 'fixed',
        bottom: '0.75rem',
        right: '0.75rem',
        zIndex: 9999,
        background: 'none',
        border: 'none',
        color: 'var(--text-color)',
        borderRadius: '50%',
        width: '1.6rem',
        height: '1.6rem',
        fontSize: '0.7rem',
        lineHeight: 1,
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.4,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.4)}
    >
      <span
        style={{
          display: 'block',
          transform: theme === 'dark' ? 'none' : 'translate(-0.5px, 2px)',
        }}
      >
        {theme === 'dark' ? '☀\uFE0E' : '☾\uFE0E'}
      </span>
    </button>
  );
}
