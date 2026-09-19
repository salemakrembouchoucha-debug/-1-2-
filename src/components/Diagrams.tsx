import React from 'react';

// 1. Dalton Atomic Model (1803) - Solid Sphere
export const DaltonDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      <defs>
        <radialGradient id="daltonSphere" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#daltonSphere)" />
      {/* 3D highlight */}
      <ellipse cx="38" cy="35" rx="15" ry="10" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 38 35)" />
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج دالتون (كرة صلبة مصمتة)</span>
  </div>
);

// 2. Thomson Plum Pudding Model (1897) - Positive sphere with embedded electrons
export const ThomsonDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      <defs>
        <radialGradient id="thomsonSphere" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#thomsonSphere)" />
      {/* Plus signs in positive sphere */}
      <g stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
        <line x1="50" y1="26" x2="50" y2="74" />
        <line x1="26" y1="50" x2="74" y2="50" />
      </g>
      {/* Embedded negative electrons */}
      {[
        { x: 30, y: 32 },
        { x: 70, y: 32 },
        { x: 32, y: 68 },
        { x: 68, y: 68 },
        { x: 50, y: 16 },
        { x: 50, y: 84 },
        { x: 16, y: 50 },
        { x: 84, y: 50 },
      ].map((pos, idx) => (
        <g key={idx}>
          <circle cx={pos.x} cy={pos.y} r="6.5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="1" />
          <line x1={pos.x - 3.5} y1={pos.y} x2={pos.x + 3.5} y2={pos.y} stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج طومسون (مطمور بها إلكترونات)</span>
  </div>
);

// 3. Rutherford Nuclear Model (1911) - Nucleus with orbiting electrons in mostly empty space
export const RutherfordDiagram: React.FC<{ size?: number; className?: string; showLabels?: boolean }> = ({
  size = 130,
  className = '',
  showLabels = false,
}) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-md">
      {/* Orbit paths */}
      <ellipse cx="60" cy="60" rx="46" ry="18" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 2" transform="rotate(0 60 60)" />
      <ellipse cx="60" cy="60" rx="46" ry="18" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 2" transform="rotate(60 60 60)" />
      <ellipse cx="60" cy="60" rx="46" ry="18" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 2" transform="rotate(120 60 60)" />

      {/* Central positive nucleus */}
      <circle cx="60" cy="60" r="14" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
      <text x="60" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
        +
      </text>

      {/* Orbiting electrons */}
      {[
        { x: 18, y: 60 },
        { x: 102, y: 60 },
        { x: 39, y: 24 },
        { x: 81, y: 96 },
        { x: 39, y: 96 },
        { x: 81, y: 24 },
      ].map((e, idx) => (
        <g key={idx}>
          <circle cx={e.x} cy={e.y} r="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
          <line x1={e.x - 2.5} y1={e.y} x2={e.x + 2.5} y2={e.y} stroke="#FFFFFF" strokeWidth="1.2" />
        </g>
      ))}

      {showLabels && (
        <>
          <line x1="60" y1="46" x2="30" y2="12" stroke="#475569" strokeWidth="1" />
          <text x="25" y="10" textAnchor="end" fill="#0F172A" fontSize="10" fontWeight="bold">نواة موجبة</text>
          <line x1="102" y1="60" x2="114" y2="60" stroke="#475569" strokeWidth="1" />
          <text x="115" y="63" textAnchor="start" fill="#0F172A" fontSize="10" fontWeight="bold">إلكترون</text>
        </>
      )}
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج رذرفورد (النواة والفراغ)</span>
  </div>
);

// 4. Bohr Planetary Model (1913) - Shells / Energy levels
export const BohrDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      {/* Concentric Energy Shells */}
      <circle cx="50" cy="50" r="18" fill="none" stroke="#CBD5E1" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#64748B" strokeWidth="1.2" />

      {/* Nucleus */}
      <circle cx="50" cy="50" r="9" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
      <circle cx="48" cy="48" r="3" fill="#F87171" />

      {/* Electrons on shells */}
      {/* Shell 1 */}
      <circle cx="50" cy="32" r="3.5" fill="#3B82F6" />
      <circle cx="50" cy="68" r="3.5" fill="#3B82F6" />
      {/* Shell 2 */}
      <circle cx="20" cy="50" r="3.5" fill="#3B82F6" />
      <circle cx="80" cy="50" r="3.5" fill="#3B82F6" />
      <circle cx="29" cy="29" r="3.5" fill="#3B82F6" />
      <circle cx="71" cy="71" r="3.5" fill="#3B82F6" />
      {/* Shell 3 */}
      <circle cx="50" cy="8" r="3.5" fill="#3B82F6" />
      <circle cx="50" cy="92" r="3.5" fill="#3B82F6" />
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج بور (مدارات / مستويات طاقة)</span>
  </div>
);

// 5. Lithium Atom Diagram (3 protons, 3 electrons, 4 neutrons) with labeling letters A, B, C, D
export const LithiumAtomDiagram: React.FC<{
  size?: number;
  className?: string;
  withLabels?: boolean;
}> = ({ size = 160, className = '', withLabels = true }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 160 160" className="drop-shadow-sm">
      {/* Shell 1 */}
      <circle cx="80" cy="80" r="35" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Shell 2 */}
      <circle cx="80" cy="80" r="60" fill="none" stroke="#64748B" strokeWidth="1.5" />

      {/* Nucleus zone */}
      <circle cx="80" cy="80" r="18" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Nucleus particles (3 protons +, 4 neutrons) */}
      <circle cx="75" cy="75" r="6" fill="#F87171" />
      <text x="75" y="79" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">+</text>

      <circle cx="85" cy="75" r="6" fill="#F87171" />
      <text x="85" y="79" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">+</text>

      <circle cx="80" cy="85" r="6" fill="#F87171" />
      <text x="80" y="89" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">+</text>

      {/* Neutrons */}
      <circle cx="72" cy="84" r="5.5" fill="#94A3B8" />
      <circle cx="88" cy="84" r="5.5" fill="#94A3B8" />

      {/* Electrons: 2 in inner shell, 1 in outer shell */}
      {/* Inner shell electrons */}
      <g>
        <circle cx="80" cy="45" r="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
        <line x1="77" y1="45" x2="83" y2="45" stroke="#FFF" strokeWidth="1.5" />
      </g>
      <g>
        <circle cx="80" cy="115" r="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
        <line x1="77" y1="115" x2="83" y2="115" stroke="#FFF" strokeWidth="1.5" />
      </g>

      {/* Outer shell electron */}
      <g>
        <circle cx="140" cy="80" r="5.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
        <line x1="137" y1="80" x2="143" y2="80" stroke="#FFF" strokeWidth="1.5" />
      </g>

      {withLabels && (
        <>
          {/* Label A pointing to outer electron */}
          <line x1="140" y1="75" x2="148" y2="45" stroke="#0F172A" strokeWidth="1.2" />
          <rect x="142" y="32" width="16" height="16" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <text x="150" y="44" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">A</text>

          {/* Label B pointing to inner orbit / electron */}
          <line x1="80" y1="120" x2="148" y2="115" stroke="#0F172A" strokeWidth="1.2" />
          <rect x="142" y="107" width="16" height="16" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <text x="150" y="119" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">B</text>

          {/* Label C pointing to the Nucleus */}
          <line x1="80" y1="70" x2="20" y2="40" stroke="#0F172A" strokeWidth="1.2" />
          <rect x="8" y="32" width="16" height="16" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <text x="16" y="44" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">C</text>

          {/* Label D pointing to a nucleon particle inside nucleus */}
          <line x1="72" y1="84" x2="20" y2="90" stroke="#0F172A" strokeWidth="1.2" />
          <rect x="8" y="82" width="16" height="16" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <text x="16" y="94" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">D</text>
        </>
      )}
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج ذرة الليثيوم (3 بروتونات)</span>
  </div>
);

// 6. Boron Atom Diagram (5 protons, 5 electrons)
export const BoronAtomDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 140, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 140 140" className="drop-shadow-sm">
      <circle cx="70" cy="70" r="30" fill="none" stroke="#94A3B8" strokeWidth="1.4" />
      <circle cx="70" cy="70" r="54" fill="none" stroke="#64748B" strokeWidth="1.4" />

      {/* Nucleus with 5 protons */}
      <circle cx="70" cy="70" r="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <text x="70" y="74" textAnchor="middle" fill="#991B1B" fontSize="11" fontWeight="bold">5P, 6N</text>

      {/* Inner shell: 2 electrons */}
      <circle cx="70" cy="40" r="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
      <circle cx="70" cy="100" r="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />

      {/* Outer shell: 3 electrons */}
      <circle cx="124" cy="70" r="4.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
      <circle cx="43" cy="24" r="4.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
      <circle cx="43" cy="116" r="4.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج ذرة البورون (العدد الذري = 5)</span>
  </div>
);

// 7. Aluminium Atom Diagram (13P, 14N, 13 electrons)
export const AluminiumAtomDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 140, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 140 140" className="drop-shadow-sm">
      <circle cx="70" cy="70" r="22" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
      <circle cx="70" cy="70" r="40" fill="none" stroke="#64748B" strokeWidth="1.2" />
      <circle cx="70" cy="70" r="58" fill="none" stroke="#475569" strokeWidth="1.2" />

      {/* Nucleus */}
      <circle cx="70" cy="70" r="14" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
      <text x="70" y="68" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="bold">13P</text>
      <text x="70" y="77" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="bold">14N</text>

      {/* Shell 1: 2 electrons */}
      <circle cx="70" cy="48" r="3" fill="#3B82F6" />
      <circle cx="70" cy="92" r="3" fill="#3B82F6" />

      {/* Shell 2: 8 electrons */}
      <circle cx="30" cy="70" r="3" fill="#3B82F6" />
      <circle cx="110" cy="70" r="3" fill="#3B82F6" />
      <circle cx="42" cy="42" r="3" fill="#3B82F6" />
      <circle cx="98" cy="42" r="3" fill="#3B82F6" />
      <circle cx="42" cy="98" r="3" fill="#3B82F6" />
      <circle cx="98" cy="98" r="3" fill="#3B82F6" />
      <circle cx="70" cy="30" r="3" fill="#3B82F6" />
      <circle cx="70" cy="110" r="3" fill="#3B82F6" />

      {/* Shell 3: 3 electrons */}
      <circle cx="128" cy="70" r="3.5" fill="#3B82F6" />
      <circle cx="41" cy="20" r="3.5" fill="#3B82F6" />
      <circle cx="41" cy="120" r="3.5" fill="#3B82F6" />
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج ذرة الألمنيوم (13 بروتون و 13 إلكترون)</span>
  </div>
);

// 8. Ball-and-Stick Model of Ammonia (NH3)
export const AmmoniaBallAndStick: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      {/* Sticks / Bonds */}
      <line x1="50" y1="42" x2="22" y2="72" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="42" x2="50" y2="82" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="42" x2="78" y2="72" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />

      {/* Nitrogen atom (Central Blue) */}
      <circle cx="50" cy="38" r="22" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="50" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="sans-serif">
        N
      </text>

      {/* Hydrogen atoms (White/light grey balls) */}
      {[
        { x: 22, y: 72 },
        { x: 50, y: 82 },
        { x: 78, y: 72 },
      ].map((h, i) => (
        <g key={i}>
          <circle cx={h.x} cy={h.y} r="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <text x={h.x} y={h.y + 5} textAnchor="middle" fill="#334155" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            H
          </text>
        </g>
      ))}
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج الكرة والعصا (جزيء الأمونيا NH3)</span>
  </div>
);

// 9. Space-Filling Model of Water (H2O)
export const WaterSpaceFilling: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      {/* Two overlapping White Hydrogen atoms */}
      <circle cx="32" cy="65" r="20" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="32" y="70" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
        H
      </text>

      <circle cx="68" cy="65" r="20" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="68" y="70" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
        H
      </text>

      {/* Large central Red Oxygen atom */}
      <circle cx="50" cy="40" r="25" fill="#DC2626" stroke="#B91C1C" strokeWidth="1.5" />
      <text x="50" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold" fontFamily="sans-serif">
        O
      </text>
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج ملء الفراغ (جزيء الماء H2O)</span>
  </div>
);

// 10. Space-Filling Model of Ammonia (NH3)
export const AmmoniaSpaceFilling: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      {/* 3 Hydrogen spheres clustered closely */}
      <circle cx="28" cy="68" r="16" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="28" y="73" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">H</text>

      <circle cx="50" cy="74" r="16" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="50" y="79" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">H</text>

      <circle cx="72" cy="68" r="16" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="72" y="73" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">H</text>

      {/* Big Blue Nitrogen sphere overlapping */}
      <circle cx="50" cy="42" r="26" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="50" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold">N</text>
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">نموذج ملء الفراغ (NH3)</span>
  </div>
);

// 11. Hofmann Voltameter (Water Electrolysis)
export const HofmannVoltameterDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 150, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size * 1.1} viewBox="0 0 140 150" className="drop-shadow-sm">
      {/* Funnel at center top */}
      <path d="M60 20 L80 20 L74 45 L66 45 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <line x1="70" y1="45" x2="70" y2="105" stroke="#64748B" strokeWidth="3" />

      {/* Two columns connected at bottom */}
      {/* Left Column (Positive - Anode -> Oxygen) */}
      <rect x="35" y="30" width="16" height="85" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" rx="2" />
      <rect x="35" y="30" width="16" height="25" fill="#FEF08A" opacity="0.8" /> {/* Gas collected */}
      <line x1="43" y1="100" x2="43" y2="120" stroke="#DC2626" strokeWidth="3" /> {/* Anode */}
      {/* Stopcock left */}
      <line x1="32" y1="28" x2="54" y2="28" stroke="#334155" strokeWidth="3" />

      {/* Right Column (Negative - Cathode -> Hydrogen) */}
      <rect x="89" y="30" width="16" height="85" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" rx="2" />
      <rect x="89" y="30" width="16" height="45" fill="#FEF08A" opacity="0.8" /> {/* More gas (H2 is double O2) */}
      <line x1="97" y1="100" x2="97" y2="120" stroke="#2563EB" strokeWidth="3" /> {/* Cathode */}
      {/* Stopcock right */}
      <line x1="86" y1="28" x2="108" y2="28" stroke="#334155" strokeWidth="3" />

      {/* Bottom connecting tube */}
      <rect x="45" y="102" width="50" height="12" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" />

      {/* Base & Power Source */}
      <rect x="30" y="128" width="80" height="14" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" rx="3" />
      <text x="70" y="139" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="bold">مصدر طاقة</text>

      {/* Labels */}
      <rect x="24" y="112" width="38" height="14" fill="#FEE2E2" stroke="#EF4444" strokeWidth="0.8" rx="2" />
      <text x="43" y="122" textAnchor="middle" fill="#991B1B" fontSize="7" fontWeight="bold">القطب الموجب</text>

      <rect x="78" y="112" width="38" height="14" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="0.8" rx="2" />
      <text x="97" y="122" textAnchor="middle" fill="#1E40AF" fontSize="7" fontWeight="bold">القطب السالب</text>
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">جهاز فولتامتر هوفمان (التحليل الكهربائي للماء)</span>
  </div>
);

// 12. Bunsen heating test tube to Limewater (Page 10 Q2)
export const BunsenHeatingDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 150, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size * 0.9} viewBox="0 0 160 130" className="drop-shadow-sm">
      {/* Stand on left */}
      <line x1="25" y1="20" x2="25" y2="120" stroke="#64748B" strokeWidth="3" />
      <line x1="15" y1="120" x2="45" y2="120" stroke="#64748B" strokeWidth="4" />

      {/* Clamp holding test tube */}
      <line x1="25" y1="60" x2="45" y2="60" stroke="#64748B" strokeWidth="2.5" />

      {/* Heated test tube containing CaCO3 */}
      <rect x="42" y="45" width="40" height="16" rx="6" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5" transform="rotate(-15 42 45)" />
      {/* Powder in tube */}
      <circle cx="48" cy="56" r="5" fill="#E2E8F0" />
      <text x="44" y="35" fill="#334155" fontSize="8" fontWeight="bold">كربونات الكالسيوم</text>

      {/* Bunsen burner flame below test tube */}
      <path d="M48 85 L44 115 L56 115 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      <path d="M50 72 C45 78 45 83 50 85 C55 83 55 78 50 72 Z" fill="#38BDF8" />
      <path d="M50 75 C48 78 48 82 50 83 C52 82 52 78 50 75 Z" fill="#F59E0B" />
      <text x="50" y="125" textAnchor="middle" fill="#64748B" fontSize="8">موقد بنسن</text>

      {/* Delivery glass tube */}
      <path d="M78 45 C100 45 105 50 115 50 L115 95" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Glass Jar A containing Limewater */}
      <rect x="100" y="70" width="30" height="45" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="102" y="85" width="26" height="28" fill="#F8FAFC" opacity="0.85" stroke="#CBD5E1" strokeWidth="1" />
      {/* Jar label A */}
      <rect x="106" y="94" width="18" height="15" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
      <text x="115" y="105" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">A</text>
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">تسخين كربونات الكالسيوم وتمرير الغاز على المادة A</span>
  </div>
);

// 13. Banana Color Change (Chemical Change Indicator)
export const BananaColorChangeDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size * 0.85} viewBox="0 0 120 90" className="drop-shadow-sm">
      {/* Plate */}
      <ellipse cx="60" cy="55" rx="55" ry="25" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
      <ellipse cx="60" cy="55" rx="42" ry="18" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />

      {/* Yellow Banana */}
      <path
        d="M25 45 C35 30 65 30 85 45 C75 52 45 52 25 45 Z"
        fill="#FACC15"
        stroke="#CA8A04"
        strokeWidth="1.5"
      />

      {/* Dark Brown Rotten/Overripe Banana showing chemical change */}
      <path
        d="M32 58 C45 42 75 44 95 62 C82 72 52 70 32 58 Z"
        fill="#78350F"
        stroke="#451A03"
        strokeWidth="1.5"
      />
      {/* Black decay spots */}
      <circle cx="50" cy="56" r="3" fill="#1C1917" />
      <circle cx="65" cy="60" r="4" fill="#1C1917" />
      <circle cx="78" cy="62" r="2.5" fill="#1C1917" />
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">تغير لون الموز (دليل حدوث تغير كيميائي)</span>
  </div>
);

// 14. Magnesium Ribbon Burning (Oxidation / Light emission)
export const MagnesiumBurningDiagram: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <div className={`flex flex-col items-center justify-center p-2 ${className}`}>
    <svg width={size} height={size * 0.9} viewBox="0 0 110 95" className="drop-shadow-md">
      {/* Metal Crucible Tongs */}
      <line x1="15" y1="20" x2="50" y2="45" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="70" x2="50" y2="45" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />

      {/* Intense White/Golden Light Flares */}
      <g>
        <circle cx="65" cy="45" r="26" fill="#FEF08A" opacity="0.6" />
        <circle cx="65" cy="45" r="16" fill="#FFFFFF" />
        {/* Ray spikes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="65"
            y1="45"
            x2={65 + 32 * Math.cos((angle * Math.PI) / 180)}
            y2={45 + 32 * Math.sin((angle * Math.PI) / 180)}
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
      {/* Burning Ribbon */}
      <line x1="50" y1="45" x2="75" y2="45" stroke="#FFFFFF" strokeWidth="4" />
    </svg>
    <span className="text-xs font-bold text-slate-700 mt-1">شريط المغنيسيوم المشتعل (انبعاث ضوء / أكسدة)</span>
  </div>
);
