export const theme = {
  colors: {
    background: '#f7f7f8',
    surface: '#ffffff',
    text: '#1b1b1f',
    muted: '#5c5c66',
    border: '#d9d9de',
    primary: '#3b5bdb',
    primaryText: '#ffffff',
    danger: '#c92a2a',
  },
  fonts: {
    body: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  radius: '0.5rem',
} as const;

export type AppTheme = typeof theme;
