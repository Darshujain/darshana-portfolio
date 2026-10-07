import type { Project } from '@/data/portfolio';

interface ProjectMockupProps {
  type: Project['mockupType'];
  name: string;
}

export function ProjectMockup({ type }: ProjectMockupProps) {
  const renderMockup = () => {
    switch (type) {
      case 'dashboard':
        return <DashboardMockup />;
      case 'product':
        return <ProductMockup />;
      case 'ecommerce':
        return <EcommerceMockup />;
      case 'weather':
        return <WeatherMockup />;
      case 'edtech':
        return <EdtechMockup />;
      case 'backend':
        return <BackendMockup />;
      case 'mobile':
        return <MobileMockup />;
      default:
        return null;
    }
  };

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br from-ink-100 to-ink-200 dark:from-ink-800 dark:to-ink-900">
      {renderMockup()}
    </div>
  );
}

function DashboardMockup() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#1e293b" />
      {/* Sidebar */}
      <rect x="0" y="0" width="70" height="250" fill="#0f172a" />
      <rect x="10" y="15" width="50" height="8" rx="4" fill="#06b6d4" />
      <rect x="10" y="40" width="50" height="6" rx="3" fill="#334155" />
      <rect x="10" y="55" width="40" height="6" rx="3" fill="#334155" />
      <rect x="10" y="70" width="45" height="6" rx="3" fill="#334155" />
      <rect x="10" y="85" width="35" height="6" rx="3" fill="#334155" />

      {/* Top bar */}
      <rect x="80" y="15" width="100" height="10" rx="5" fill="#475569" />
      <rect x="340" y="15" width="45" height="10" rx="5" fill="#475569" />

      {/* Stat cards */}
      <rect x="80" y="40" width="95" height="55" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="90" y="50" width="30" height="6" rx="3" fill="#64748b" />
      <rect x="90" y="62" width="50" height="14" rx="4" fill="#22d3ee" />
      <rect x="90" y="82" width="45" height="5" rx="2.5" fill="#334155" />

      <rect x="185" y="40" width="95" height="55" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="195" y="50" width="35" height="6" rx="3" fill="#64748b" />
      <rect x="195" y="62" width="45" height="14" rx="4" fill="#06b6d4" />
      <rect x="195" y="82" width="50" height="5" rx="2.5" fill="#334155" />

      <rect x="290" y="40" width="95" height="55" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="300" y="50" width="25" height="6" rx="3" fill="#64748b" />
      <rect x="300" y="62" width="55" height="14" rx="4" fill="#22d3ee" />
      <rect x="300" y="82" width="40" height="5" rx="2.5" fill="#334155" />

      {/* Table */}
      <rect x="80" y="110" width="305" height="120" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="90" y="122" width="60" height="7" rx="3.5" fill="#475569" />
      <rect x="200" y="122" width="40" height="7" rx="3.5" fill="#475569" />
      <rect x="270" y="122" width="50" height="7" rx="3.5" fill="#475569" />
      <rect x="350" y="122" width="25" height="7" rx="3.5" fill="#475569" />

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="90" y={142 + i * 20} width="50" height="6" rx="3" fill="#334155" />
          <rect x="200" y={142 + i * 20} width="35" height="6" rx="3" fill="#334155" />
          <rect x="270" y={142 + i * 20} width="40" height="6" rx="3" fill="#334155" />
          <rect x="350" y={142 + i * 20} width="20" height="6" rx="3" fill={i === 0 ? '#22c55e' : i === 1 ? '#f59e0b' : '#22d3ee'} />
        </g>
      ))}
    </svg>
  );
}

function ProductMockup() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#0f172a" />
      {/* Header */}
      <rect x="0" y="0" width="400" height="40" fill="#083344" />
      <rect x="15" y="14" width="60" height="12" rx="6" fill="#22d3ee" />
      <rect x="310" y="14" width="75" height="12" rx="6" fill="#164e63" />

      {/* Left panel */}
      <rect x="0" y="40" width="100" height="210" fill="#083344" />
      <rect x="12" y="55" width="76" height="8" rx="4" fill="#164e63" />
      <rect x="12" y="72" width="60" height="6" rx="3" fill="#164e63" />
      <rect x="12" y="84" width="70" height="6" rx="3" fill="#164e63" />
      <rect x="12" y="96" width="55" height="6" rx="3" fill="#164e63" />
      <rect x="12" y="108" width="65" height="6" rx="3" fill="#0e7490" />

      {/* Main content */}
      <rect x="115" y="55" width="120" height="10" rx="5" fill="#475569" />
      <rect x="115" y="72" width="180" height="6" rx="3" fill="#334155" />

      {/* Cards */}
      <rect x="115" y="95" width="130" height="65" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="125" y="105" width="40" height="6" rx="3" fill="#64748b" />
      <rect x="125" y="118" width="60" height="14" rx="4" fill="#06b6d4" />
      <rect x="125" y="140" width="80" height="5" rx="2.5" fill="#334155" />
      <rect x="125" y="148" width="65" height="5" rx="2.5" fill="#334155" />

      <rect x="255" y="95" width="130" height="65" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="265" y="105" width="35" height="6" rx="3" fill="#64748b" />
      <rect x="265" y="118" width="50" height="14" rx="4" fill="#22d3ee" />
      <rect x="265" y="140" width="70" height="5" rx="2.5" fill="#334155" />
      <rect x="265" y="148" width="60" height="5" rx="2.5" fill="#334155" />

      {/* Bar chart */}
      <rect x="115" y="175" width="270" height="65" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="125" y="183" width="50" height="6" rx="3" fill="#475569" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={135 + i * 28}
          y={210 - (i % 3) * 10 - (i === 2 ? 15 : 0)}
          width="16"
          height={30 + (i % 3) * 10 + (i === 2 ? 15 : 0)}
          rx="3"
          fill={i === 2 ? '#06b6d4' : '#164e63'}
        />
      ))}
    </svg>
  );
}

function EcommerceMockup() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#f8fafc" />
      {/* Header */}
      <rect x="0" y="0" width="400" height="45" fill="#ffffff" />
      <rect x="15" y="16" width="70" height="14" rx="7" fill="#06b6d4" />
      <rect x="270" y="16" width="30" height="14" rx="7" fill="#e2e8f0" />
      <rect x="310" y="16" width="30" height="14" rx="7" fill="#e2e8f0" />
      <rect x="350" y="16" width="35" height="14" rx="7" fill="#06b6d4" />
      <line x1="0" y1="45" x2="400" y2="45" stroke="#e2e8f0" strokeWidth="1" />

      {/* Product grid */}
      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect x={20 + col * 125} y="60" width="110" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x={28 + col * 125} y="68" width="94" height="50" rx="6" fill="#ecfeff" />
          <circle cx={75 + col * 125} cy="93" r="16" fill="#a5f3fc" />
          <rect x={28 + col * 125} y="125" width="40" height="6" rx="3" fill="#94a3b8" />
        </g>
      ))}

      {[0, 1, 2].map((col) => (
        <g key={`row2-${col}`}>
          <rect x={20 + col * 125} y="155" width="110" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x={28 + col * 125} y="163" width="94" height="50" rx="6" fill="#cffafe" />
          <rect x={28 + col * 125} y="220" width="35" height="6" rx="3" fill="#94a3b8" />
          <rect x={28 + col * 125} y="200" width="50" height="8" rx="4" fill="#06b6d4" />
        </g>
      ))}
    </svg>
  );
}

function EdtechMockup() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="edtech-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0a1d" />
          <stop offset="100%" stopColor="#2e1065" />
        </linearGradient>
        <linearGradient id="edtech-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#edtech-bg)" />
      <circle cx="330" cy="40" r="70" fill="#d946ef" opacity="0.15" />

      {/* Nav */}
      <rect x="20" y="16" width="70" height="10" rx="5" fill="url(#edtech-accent)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={190 + i * 42} y="18" width="32" height="6" rx="3" fill="#a78bfa" opacity="0.45" />
      ))}

      {/* Hero */}
      <rect x="20" y="50" width="160" height="14" rx="7" fill="#ffffff" opacity="0.9" />
      <rect x="20" y="70" width="120" height="14" rx="7" fill="url(#edtech-accent)" />
      <rect x="20" y="94" width="150" height="6" rx="3" fill="#c4b5fd" opacity="0.5" />
      <rect x="20" y="106" width="130" height="6" rx="3" fill="#c4b5fd" opacity="0.5" />
      <rect x="20" y="122" width="64" height="18" rx="9" fill="url(#edtech-accent)" />
      <rect x="92" y="122" width="64" height="18" rx="9" fill="none" stroke="#a78bfa" strokeOpacity="0.6" />

      {/* Course cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 125} y="160" width="110" height="74" rx="10" fill="#ffffff" opacity="0.06" stroke="#a78bfa" strokeOpacity="0.25" />
          <rect x={30 + i * 125} y="170" width="28" height="28" rx="8" fill={['#8b5cf6', '#d946ef', '#22d3ee'][i]} opacity="0.85" />
          <rect x={30 + i * 125} y="206" width="70" height="6" rx="3" fill="#ffffff" opacity="0.7" />
          <rect x={30 + i * 125} y="218" width="50" height="5" rx="2.5" fill="#c4b5fd" opacity="0.4" />
        </g>
      ))}

      {/* Mentor avatar stack */}
      <g>
        <rect x="230" y="55" width="150" height="85" rx="12" fill="#ffffff" opacity="0.07" stroke="#a78bfa" strokeOpacity="0.3" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={252 + i * 18} cy="80" r="11" fill={['#a78bfa', '#e879f9', '#67e8f9'][i]} stroke="#1e1b4b" strokeWidth="2" />
        ))}
        <rect x="245" y="102" width="100" height="6" rx="3" fill="#ffffff" opacity="0.7" />
        <rect x="245" y="114" width="70" height="5" rx="2.5" fill="#c4b5fd" opacity="0.4" />
      </g>
    </svg>
  );
}

function BackendMockup() {
  const lines = [
    { w: 120, c: '#a78bfa' },
    { w: 180, c: '#e4e4e7' },
    { w: 150, c: '#e879f9' },
    { w: 90, c: '#71717a' },
    { w: 170, c: '#67e8f9' },
    { w: 130, c: '#e4e4e7' },
  ];
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#09090b" />
      <circle cx="80" cy="220" r="90" fill="#8b5cf6" opacity="0.12" />

      {/* Terminal */}
      <rect x="18" y="18" width="210" height="214" rx="10" fill="#18181b" stroke="#3f3f46" />
      <circle cx="32" cy="32" r="4" fill="#f87171" />
      <circle cx="45" cy="32" r="4" fill="#fbbf24" />
      <circle cx="58" cy="32" r="4" fill="#34d399" />
      {lines.map((l, i) => (
        <g key={i}>
          <rect x="30" y={56 + i * 22} width="8" height="6" rx="2" fill="#8b5cf6" />
          <rect x="44" y={56 + i * 22} width={l.w * 0.95} height="6" rx="3" fill={l.c} opacity="0.75" />
        </g>
      ))}
      <rect x="30" y="196" width="60" height="16" rx="8" fill="#34d399" opacity="0.2" />
      <rect x="38" y="202" width="44" height="4" rx="2" fill="#34d399" />

      {/* Architecture nodes */}
      {[
        { y: 30, label: '#8b5cf6' },
        { y: 100, label: '#d946ef' },
        { y: 170, label: '#22d3ee' },
      ].map((n, i) => (
        <g key={i}>
          <rect x="262" y={n.y} width="120" height="48" rx="10" fill="#18181b" stroke={n.label} strokeOpacity="0.6" />
          <rect x="274" y={n.y + 12} width="22" height="22" rx="6" fill={n.label} opacity="0.85" />
          <rect x="304" y={n.y + 14} width="60" height="6" rx="3" fill="#e4e4e7" opacity="0.8" />
          <rect x="304" y={n.y + 26} width="40" height="5" rx="2.5" fill="#71717a" />
        </g>
      ))}
      <path d="M322 78 L322 100 M322 148 L322 170" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M228 125 L262 125" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

function MobileMockup() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="mobile-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mobile-btn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="#0c0a1d" />
      <circle cx="200" cy="125" r="140" fill="url(#mobile-glow)" />

      {/* Motion waves */}
      {[40, 60, 80].map((r, i) => (
        <g key={r} opacity={0.5 - i * 0.12}>
          <path d={`M${145 - r / 2} ${125 - r} A ${r} ${r} 0 0 0 ${145 - r / 2} ${125 + r}`} fill="none" stroke="#a78bfa" strokeWidth="2" />
          <path d={`M${255 + r / 2} ${125 - r} A ${r} ${r} 0 0 1 ${255 + r / 2} ${125 + r}`} fill="none" stroke="#e879f9" strokeWidth="2" />
        </g>
      ))}

      {/* Phone */}
      <g transform="rotate(-8 200 125)">
        <rect x="155" y="20" width="90" height="190" rx="18" fill="#18181b" stroke="#52525b" strokeWidth="2" />
        <rect x="185" y="28" width="30" height="6" rx="3" fill="#3f3f46" />
        <rect x="168" y="50" width="64" height="8" rx="4" fill="#ffffff" opacity="0.85" />
        <rect x="168" y="66" width="44" height="5" rx="2.5" fill="#a78bfa" opacity="0.6" />

        {/* Mic */}
        <circle cx="200" cy="112" r="22" fill="url(#mobile-btn)" />
        <rect x="195" y="101" width="10" height="16" rx="5" fill="#ffffff" />
        <path d="M191 113 Q191 124 200 124 Q209 124 209 113" fill="none" stroke="#ffffff" strokeWidth="2" />

        {/* Equalizer */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={172 + i * 8} y={150 - [6, 12, 18, 10, 16, 8, 4][i]} width="4" height={[6, 12, 18, 10, 16, 8, 4][i] * 2} rx="2" fill="#e879f9" opacity="0.8" />
        ))}
        <rect x="168" y="182" width="64" height="16" rx="8" fill="url(#mobile-btn)" />
      </g>
    </svg>
  );
}

function WeatherMockup() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="weather-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#083344" />
          <stop offset="100%" stopColor="#164e63" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#weather-bg)" />

      {/* Sun/cloud */}
      <circle cx="320" cy="55" r="22" fill="#fbbf24" opacity="0.9" />
      <ellipse cx="290" cy="65" rx="30" ry="14" fill="#cbd5e1" opacity="0.6" />

      {/* Temperature */}
      <text x="30" y="90" fontFamily="sans-serif" fontSize="42" fontWeight="bold" fill="#ffffff">24°</text>
      <rect x="30" y="105" width="80" height="8" rx="4" fill="#22d3ee" />
      <rect x="30" y="120" width="60" height="6" rx="3" fill="#67e8f9" opacity="0.6" />

      {/* Forecast cards */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={20 + i * 75} y="150" width="65" height="80" rx="10" fill="#ffffff" opacity="0.1" />
          <rect x={30 + i * 75} y="160" width="45" height="6" rx="3" fill="#67e8f9" opacity="0.5" />
          <circle cx={52 + i * 75} cy="185" r="12" fill={i % 2 === 0 ? '#fbbf24' : '#cbd5e1'} opacity="0.7" />
          <text x={52 + i * 75} y="222" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#ffffff" textAnchor="middle">
            {20 + i}°
          </text>
        </g>
      ))}
    </svg>
  );
}
