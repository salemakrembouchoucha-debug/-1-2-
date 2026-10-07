import React from 'react';

/**
 * Text-only representation of school and ministry names
 * (All graphical logos and icons removed as requested)
 */

export const AlrayyanLogo: React.FC<{
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
}> = ({ className = '', variant = 'full' }) => {
  return (
    <div className={`flex flex-col text-right select-none ${className}`} dir="rtl">
      <span className="font-extrabold text-base sm:text-lg text-amber-950 tracking-tight font-['Cairo',sans-serif] leading-snug">
        مدرسة الريّـان الخاصة
      </span>
      <span className="text-xs sm:text-sm font-bold text-amber-800 leading-snug">
        قسم العلوم • الصف الثامن
      </span>
      {variant === 'full' && (
        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 font-sans tracking-wide mt-0.5">
          Alrayyan Private Schools
        </span>
      )}
    </div>
  );
};

export const QatarMoELogo: React.FC<{
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
}> = ({ className = '', variant = 'full' }) => {
  return (
    <div className={`flex flex-col text-right select-none ${className}`} dir="rtl">
      <span className="font-extrabold text-sm sm:text-base text-[#8A1538] tracking-tight font-['Cairo',sans-serif] leading-snug">
        دولة قطر
      </span>
      <span className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
        وزارة التربية والتعليم والتعليم العالي
      </span>
      {variant === 'full' && (
        <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 font-sans tracking-wide mt-0.5">
          Ministry of Education and Higher Education
        </span>
      )}
    </div>
  );
};
