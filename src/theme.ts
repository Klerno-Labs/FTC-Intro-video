/**
 * FTC Filters — Design System
 * Colors, typography, spacing, and motion tokens.
 */
import { fontFamily } from './fonts';

// ─── Colors ──────────────────────────────────────────────
export const colors = {
  // Primary brand
  navy: '#0A1628',
  navyLight: '#132240',
  steel: '#1E3A5F',

  // Accent
  blue: '#2E6DAD',
  blueLight: '#4A90D9',
  blueSubtle: '#1A3F6F',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#F2F4F7',
  grey100: '#E8ECF1',
  grey200: '#C5CDD8',
  grey300: '#8A96A8',
  grey400: '#5C6B80',
  grey500: '#3D4F63',

  // Functional
  gold: '#C8A45A',
  goldSubtle: '#A8874A',

  // Backgrounds
  bgDark: '#060E1A',
  bgOverlay: 'rgba(6, 14, 26, 0.85)',
} as const;

// ─── Typography ──────────────────────────────────────────
export const fonts = {
  heading: fontFamily,
  body: fontFamily,
  mono: 'JetBrains Mono, Fira Code, monospace',
} as const;

export const fontSizes = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 36,
  xl: 48,
  xxl: 64,
  hero: 80,
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0em',
  wide: '0.06em',
  xwide: '0.12em',
  xxwide: '0.2em',
} as const;

// ─── Spacing ─────────────────────────────────────────────
export const spacing = {
  xs: 8,
  sm: 16,
  md: 32,
  lg: 48,
  xl: 64,
  xxl: 96,
  xxxl: 128,
} as const;

// ─── Motion ──────────────────────────────────────────────
// Spring presets per remotion-dev/skills best practices.
// damping:200 = smooth corporate reveal (no bounce).
// damping:20 + stiffness:200 = snappy UI element entrance.
export const springPresets = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
  gentle: { damping: 100, stiffness: 40 },
} as const;

export const motion = {
  // Easing curves
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],

  // Duration presets (in frames at 30fps)
  fadeIn: 20,
  fadeOut: 15,
  slideIn: 25,
  scaleReveal: 30,

  // Parallax
  parallaxStrength: 0.03,
  parallaxSlow: 0.015,
} as const;

// ─── Layout ──────────────────────────────────────────────
export const layout = {
  width: 1920,
  height: 1080,
  safeArea: {
    horizontal: 120,
    vertical: 80,
  },
} as const;
