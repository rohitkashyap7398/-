import React from 'react';

interface FestiveDiyaProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isBurning?: boolean;
  className?: string;
  onClick?: () => void;
  showGlow?: boolean;
}

export const FestiveDiya: React.FC<FestiveDiyaProps> = ({
  size = 'md',
  isBurning = true,
  className = '',
  onClick,
  showGlow = true,
}) => {
  const sizeMap = {
    xs: { width: 28, height: 24, flameScale: 0.6 },
    sm: { width: 40, height: 32, flameScale: 0.8 },
    md: { width: 56, height: 44, flameScale: 1.0 },
    lg: { width: 78, height: 60, flameScale: 1.35 },
    xl: { width: 104, height: 80, flameScale: 1.7 },
  };

  const dim = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${
        onClick ? 'cursor-pointer transform hover:scale-110 transition-transform' : ''
      } ${className}`}
      style={{ width: dim.width, height: dim.height }}
      title={isBurning ? 'प्रज्वलित पावन दीप' : 'दीप'}
    >
      {/* Ambient Radial Golden Glow when burning */}
      {isBurning && showGlow && (
        <div
          className="absolute -top-3 inset-x-0 mx-auto w-10 h-10 rounded-full pointer-events-none animate-diya-glow"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 75%)',
            filter: 'blur(4px)',
            transform: `scale(${dim.flameScale * 1.5})`,
          }}
        />
      )}

      <svg
        viewBox="0 0 100 80"
        className="w-full h-full overflow-visible drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
      >
        <defs>
          {/* Terracotta Clay Gradient */}
          <linearGradient id="clayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#b45309" />
            <stop offset="70%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Diya Rim Highlight */}
          <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Golden Ghee / Oil Pool */}
          <radialGradient id="oilGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>

          {/* Outer Orange Flame */}
          <radialGradient id="outerFlame" cx="50%" cy="80%" r="75%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.8" />
          </radialGradient>

          {/* Inner Bright Yellow Flame Core */}
          <linearGradient id="innerCore" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>

        {/* Diya Base / Stand */}
        <ellipse cx="50" cy="72" rx="22" ry="5" fill="#451a03" opacity="0.6" />

        {/* Terracotta Clay Body */}
        <path
          d="M 12,46 C 14,64 30,73 50,73 C 70,73 86,64 88,46 C 88,42 80,45 50,45 C 20,45 12,42 12,46 Z"
          fill="url(#clayGradient)"
          stroke="#92400e"
          strokeWidth="1.2"
        />

        {/* Diya Inner Cavity / Oil Well */}
        <ellipse cx="50" cy="46" rx="36" ry="9" fill="url(#oilGradient)" />

        {/* Golden Rim Border with subtle bead details */}
        <ellipse
          cx="50"
          cy="46"
          rx="37"
          ry="9.5"
          fill="none"
          stroke="url(#rimHighlight)"
          strokeWidth="1.8"
        />

        {/* Wick (बाती) */}
        <path
          d="M 50,46 Q 51,36 50,32"
          stroke="#292524"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="50" cy="32" r="1.5" fill="#ef4444" />

        {/* Dynamic Flickering Flame when burning */}
        {isBurning && (
          <g className="diya-flame-wrapper">
            {/* Outer Flame with dynamic SVG wave */}
            <path
              d="M 50,10 C 58,22 61,28 58,35 C 55,41 45,41 42,35 C 39,28 42,22 50,10 Z"
              fill="url(#outerFlame)"
              className="diya-flame-outer"
            />
            {/* Inner Core Flame */}
            <path
              d="M 50,16 C 54,24 55,29 54,34 C 52,38 48,38 46,34 C 45,29 46,24 50,16 Z"
              fill="url(#innerCore)"
              className="diya-flame-inner"
            />
            {/* Pure Light Spark Center */}
            <ellipse cx="50" cy="32" rx="2" ry="3.5" fill="#ffffff" opacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
};
