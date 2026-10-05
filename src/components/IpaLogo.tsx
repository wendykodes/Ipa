import React from 'react';

interface IpaLogoProps {
  size?: number | string;
  className?: string;
  showTagline?: boolean;
}

export const IpaLogo: React.FC<IpaLogoProps> = ({ 
  size = 48, 
  className = '', 
  showTagline = true 
}) => {
  return (
    <div 
      className={`relative rounded-full select-none shrink-0 ${className}`} 
      style={{ width: size, height: size }}
      title="IPA Interiors International Ltd - For a touch of class"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id="goldOuterRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA67" />
            <stop offset="25%" stopColor="#F7E7B4" />
            <stop offset="50%" stopColor="#C59B3F" />
            <stop offset="75%" stopColor="#EAD397" />
            <stop offset="100%" stopColor="#A37A24" />
          </linearGradient>

          <linearGradient id="goldDiamond" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="35%" stopColor="#E5BE64" />
            <stop offset="70%" stopColor="#B3862B" />
            <stop offset="100%" stopColor="#D9B156" />
          </linearGradient>

          <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2C275" />
            <stop offset="50%" stopColor="#FFF4D6" />
            <stop offset="100%" stopColor="#D4A745" />
          </linearGradient>

          <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Deep Obsidian Background Disc */}
        <circle cx="250" cy="250" r="248" fill="#0A0908" />

        {/* Outer Metallic Gold Border Ring */}
        <circle
          cx="250"
          cy="250"
          r="228"
          stroke="url(#goldOuterRing)"
          strokeWidth="12"
          fill="none"
        />

        {/* Inner Gold Thin Accent Ring */}
        <circle
          cx="250"
          cy="250"
          r="212"
          stroke="url(#goldOuterRing)"
          strokeWidth="3.5"
          fill="none"
          strokeOpacity="0.85"
        />

        {/* === TOP EMBLEM: FACETED GOLD DIAMOND === */}
        <g transform="translate(250, 142)">
          {/* Table Top Horizontal */}
          <line x1="-58" y1="-44" x2="58" y2="-44" stroke="url(#goldDiamond)" strokeWidth="6" strokeLinecap="round" />
          
          {/* Crown Angles */}
          <path
            d="M -58 -44 L -92 -18 L 0 62 L 92 -18 L 58 -44 Z"
            stroke="url(#goldDiamond)"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />

          {/* Girdle Line */}
          <line x1="-92" y1="-18" x2="92" y2="-18" stroke="url(#goldDiamond)" strokeWidth="5" />

          {/* Crown Vertical & Diagonal Facet Lines */}
          <line x1="-24" y1="-44" x2="-44" y2="-18" stroke="url(#goldDiamond)" strokeWidth="5" />
          <line x1="24" y1="-44" x2="44" y2="-18" stroke="url(#goldDiamond)" strokeWidth="5" />
          <line x1="-24" y1="-44" x2="0" y2="-18" stroke="url(#goldDiamond)" strokeWidth="5" />
          <line x1="24" y1="-44" x2="0" y2="-18" stroke="url(#goldDiamond)" strokeWidth="5" />

          {/* Pavilion Internal Facets meeting at bottom tip (0, 62) */}
          <path
            d="M -44 -18 Q -20 22 0 62 Q 20 22 44 -18"
            stroke="url(#goldDiamond)"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M 0 -18 L 0 62"
            stroke="url(#goldDiamond)"
            strokeWidth="5"
          />
          <path
            d="M -92 -18 Q -50 20 0 62 Q 50 20 92 -18"
            stroke="url(#goldDiamond)"
            strokeWidth="4"
            fill="none"
            opacity="0.8"
          />
        </g>

        {/* === CENTER LOGO TEXT: 'IPA' === */}
        <g id="IPA-Letters">
          {/* Letter 'I' */}
          <path
            d="M 168 232 L 186 232 L 186 324 L 168 324 Z"
            fill="#FFFFFF"
          />

          {/* Letter 'P' */}
          <path
            d="M 204 232 L 244 232 C 265 232 278 243 278 261 C 278 279 265 290 244 290 L 222 290 L 222 324 L 204 324 Z M 222 249 L 222 273 L 242 273 C 253 273 260 268 260 261 C 260 254 253 249 242 249 Z"
            fill="#FFFFFF"
          />

          {/* Letter 'A' (Greek Delta Triangle) */}
          <path
            d="M 296 324 L 333 232 L 370 324 Z M 333 262 L 314 310 L 352 310 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* === SUB-BRAND: INTERIORS INTERNATIONAL LTD. === */}
        <text
          x="250"
          y="346"
          textAnchor="middle"
          fill="url(#goldText)"
          fontSize="15.5"
          fontWeight="700"
          letterSpacing="4.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          INTERIORS INTERNATIONAL LTD.
        </text>

        {/* === TAGLINE: "For a touch of class" === */}
        {showTagline && (
          <text
            x="250"
            y="368"
            textAnchor="middle"
            fill="#EAD397"
            fontSize="18.5"
            fontStyle="italic"
            fontWeight="400"
            fontFamily="'Cormorant Garamond', Georgia, 'Brush Script MT', cursive, serif"
            letterSpacing="1"
          >
            "For a touch of class"
          </text>
        )}
      </svg>
    </div>
  );
};
