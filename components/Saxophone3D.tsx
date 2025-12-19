import React from 'react';
import { KeyName } from '../types';
import { KEY_COORDINATES } from '../constants';

interface Saxophone3DProps {
  activeKeys: KeyName[];
}

const Saxophone3D: React.FC<Saxophone3DProps> = ({ activeKeys }) => {
  const isKeyActive = (key: KeyName) => activeKeys.includes(key);

  return (
    // Reduced padding (p-1 instead of p-4) to maximize size
    <div className="w-full h-full flex items-center justify-center relative select-none p-1">
      
      <svg
        viewBox="0 0 400 520" 
        className="h-full w-auto max-w-full"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- GUIDE LINES (Schematic Structure) --- */}
        {/* Dark transparent stroke for Orange background */}
        
        {/* Main Center Axis */}
        <line x1="240" y1="80" x2="240" y2="480" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Connection: Palm Keys to Main */}
        <line x1="160" y1="130" x2="210" y2="130" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

        {/* Connection: Side Keys to Main */}
        <line x1="140" y1="370" x2="210" y2="370" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

        {/* Connection: Pinky Keys to Main */}
        <line x1="260" y1="220" x2="280" y2="220" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

        {/* Labels for Sections */}
        <text x="300" y="50" className="text-[10px] fill-slate-900/60 font-bold uppercase tracking-widest" textAnchor="middle">Main Gauche</text>
        <text x="50" y="300" className="text-[10px] fill-slate-900/60 font-bold uppercase tracking-widest">Main Droite</text>

        {/* --- KEYS --- */}
        {Object.entries(KEY_COORDINATES).map(([keyName, coords]) => {
            const active = isKeyActive(keyName as KeyName);
            const { x, y, r, label } = coords;

            return (
              <g key={keyName} className="transition-all duration-300 cursor-pointer">
                
                {/* Key Circle */}
                <circle
                  cx={x} cy={y}
                  r={r}
                  fill={active ? "#1e293b" : "#ffffff"} 
                  stroke={active ? "#0f172a" : "#94a3b8"}
                  strokeWidth={active ? 0 : 1.5}
                  className="transition-colors duration-200"
                />

                {/* Inner Ring for Open Keys (style choice) */}
                {!active && (
                   <circle cx={x} cy={y} r={r - 4} stroke="#cbd5e1" strokeWidth="1" fill="none" />
                )}

                {/* Label Text */}
                <text
                  x={x} y={y}
                  dy="0.35em"
                  textAnchor="middle"
                  fontSize={r < 10 ? "8" : (r < 15 ? "10" : "12")}
                  fontWeight="bold"
                  fill={active ? "#ffffff" : "#475569"}
                  className="pointer-events-none font-sans"
                >
                  {label}
                </text>
                
              </g>
            );
        })}
      </svg>
    </div>
  );
};

export default Saxophone3D;