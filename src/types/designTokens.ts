/**
 * IPA INTERIORS INTERNATIONAL LTD
 * CENTRALIZED BRAND DESIGN TOKEN SYSTEM
 * 
 * Non-Negotiable Brand Palette:
 * PRIMARY: ROSEWOOD RED (#801D31)
 * SECONDARY: WHITE (#FFFFFF) - Dominant canvas
 * SUPPORTING: Warm White, Ivory, Soft Stone, Architectural Grey, Charcoal, Deep Neutral
 */

export const IPA_TOKENS = {
  // Brand Primary: Rosewood Red
  primaryBrand: '#801D31',
  primaryHover: '#6B1727',
  primaryActive: '#54121F',
  primarySubtle: '#FDF6F8',
  primaryBorder: '#EED5DC',
  primaryText: '#801D31',

  // Dominant Visual Canvas & Surfaces (Predominantly White)
  canvas: '#FFFFFF',
  canvasSubtle: '#FAF8F5',
  canvasWarm: '#F5F2EC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F9F8F6',

  // Architectural Neutral Borders
  borderSubtle: '#EDE8E1',
  borderDefault: '#E2DCD3',
  borderStrong: '#C8BFB3',
  borderRosewood: '#E8CAD2',

  // Typography Contrast (High legibility charcoal / warm black on white)
  textPrimary: '#1C1917',
  textSecondary: '#44403C',
  textMuted: '#78716C',
  textSubtle: '#A8A29E',
  textInverse: '#FFFFFF',

  // Semantic States (Restrained architectural hues, never competing with Rosewood)
  success: '#2D6A4F',
  successSubtle: '#F0F7F4',
  successBorder: '#B7E4C7',

  warning: '#9C6615',
  warningSubtle: '#FEF9EE',
  warningBorder: '#F6D59A',

  error: '#9E2A2B',
  errorSubtle: '#FCF3F3',
  errorBorder: '#F5C6C6',

  info: '#3D5A80',
  infoSubtle: '#F4F7FB',
  infoBorder: '#C9D9E8',
} as const;

export type IpaTokens = typeof IPA_TOKENS;
