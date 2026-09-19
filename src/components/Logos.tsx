import React from 'react';

export const AlrayyanLogo: React.FC<{ className?: string; variant?: 'full' | 'compact' | 'icon' }> = ({
  className = 'h-14',
  variant = 'full',
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} dir="rtl">
      {/* Rhombus Calligraphic Icon */}
      <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="rayyanGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="rayyanGoldLight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Tilted Diamond layered calligraphic geometric shape */}
          <g transform="rotate(45 50 50)">
            <rect x="20" y="20" width="60" height="60" rx="8" fill="url(#rayyanGold)" />
            <rect x="28" y="28" width="44" height="44" rx="5" fill="#FFFFFF" />
            <rect x="34" y="34" width="32" height="32" rx="4" fill="url(#rayyanGold)" />
            {/* Geometric Arabic calligraphy stylization */}
            <path
              d="M38 44 H62 V48 H44 V56 H58 V60 H38 Z"
              fill="#FFFFFF"
            />
            <circle cx="56" cy="40" r="3" fill="#FFFFFF" />
            <circle cx="44" cy="64" r="2.5" fill="#FFFFFF" />
          </g>
          {/* Accent fan / rays at the lower right */}
          <path
            d="M72 65 L88 78 L80 88 L65 74 Z"
            fill="url(#rayyanGoldLight)"
            opacity="0.9"
          />
          <path
            d="M62 75 L76 90 L68 96 L56 82 Z"
            fill="url(#rayyanGold)"
            opacity="0.8"
          />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col text-right leading-tight">
          <span className="font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight font-['Cairo',sans-serif]">
            مدارس الريّـان الخاصة
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-600 tracking-wide font-sans">
            Alrayyan Private Schools
          </span>
          {variant === 'full' && (
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-amber-700 font-bold mt-0.5">
              <span>أخلاق</span>
              <span>•</span>
              <span>إنضباط</span>
              <span>•</span>
              <span>تفوق</span>
              <span className="text-slate-400 text-[8px] mx-1">|</span>
              <span className="font-medium text-slate-500 font-sans">Ethics • Discipline • Excel</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const QatarMoELogo: React.FC<{ className?: string; variant?: 'full' | 'compact' | 'icon' }> = ({
  className = 'h-14',
  variant = 'full',
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} dir="rtl">
      {/* Qatar National Emblem (Maroon) */}
      <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Crossed swords in maroon #8A1538 */}
          <g fill="#8A1538" stroke="#8A1538">
            {/* Left curved scimitar */}
            <path
              d="M20 78 C35 65 52 48 78 22 C79 21 82 22 80 25 C68 45 45 70 28 84 C26 85 24 83 23 81 Z"
              fill="#8A1538"
            />
            {/* Right curved scimitar */}
            <path
              d="M80 78 C65 65 48 48 22 22 C21 21 18 22 20 25 C32 45 55 70 72 84 C74 85 76 83 77 81 Z"
              fill="#8A1538"
            />
            {/* Sword handles */}
            <circle cx="21" cy="81" r="3.5" fill="#8A1538" />
            <circle cx="79" cy="81" r="3.5" fill="#8A1538" />

            {/* Central circle showing dhow and palm tree */}
            <circle cx="50" cy="42" r="21" fill="#FFFFFF" stroke="#8A1538" strokeWidth="2" />

            {/* Palm tree island */}
            <path d="M42 52 Q50 50 58 52 C56 55 44 55 42 52 Z" fill="#8A1538" />
            <line x1="50" y1="50" x2="50" y2="35" stroke="#8A1538" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 35 Q44 32 42 36 Q47 34 50 35 Q53 30 50 28 Q52 32 50 35 Q57 32 58 36 Q53 34 50 35" fill="#8A1538" />

            {/* Traditional Qatar Dhow Boat */}
            <path d="M57 48 C62 48 66 45 67 44 C65 49 59 50 56 50 Z" fill="#8A1538" />
            {/* Sail */}
            <path d="M60 48 L64 36 C64 42 62 46 60 48 Z" fill="#8A1538" />

            {/* Sea waves */}
            <path
              d="M36 57 Q43 54 50 57 Q57 60 64 57"
              fill="none"
              stroke="#8A1538"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M40 60 Q47 58 54 60 Q60 62 66 60"
              fill="none"
              stroke="#8A1538"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col text-right leading-tight">
          <span className="font-extrabold text-base sm:text-lg text-[#8A1538] tracking-tight font-['Cairo',sans-serif]">
            وزارة التربية والتعليم والتعليم العالي
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 tracking-wide font-sans">
            Ministry of Education and Higher Education
          </span>
          {variant === 'full' && (
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-500 font-bold mt-0.5">
              <span className="text-[#8A1538]">دولة قطر</span>
              <span>•</span>
              <span className="font-sans">State of Qatar</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
