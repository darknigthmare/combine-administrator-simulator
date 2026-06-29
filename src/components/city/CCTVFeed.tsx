import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Shield, Eye, Flame, Biohazard, Activity, Play } from 'lucide-react';

interface CCTVFeedProps {
  sectorId: string | null;
}

export const CCTVFeed: React.FC<CCTVFeedProps> = ({ sectorId }) => {
  const { sectors } = useGameStore();
  const [glitch, setGlitch] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<string>('');

  const sector = sectors.find(s => s.id === sectorId) || null;

  // Simulate video noise glitches
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150 + Math.random() * 200);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Live timestamp clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      setTimestamp(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    updateTime();
    const clock = setInterval(updateTime, 1000);
    return () => clearInterval(clock);
  }, []);

  if (!sector) {
    return (
      <div className="h-full min-h-[220px] bg-[#05080c] border border-slate-800 rounded flex flex-col items-center justify-center text-slate-600 font-mono text-[10px] select-none relative">
        <Activity className="w-8 h-8 text-slate-800 animate-pulse mb-2" />
        <span>SECTEUR NON SÉLECTIONNÉ</span>
        <span>EN ATTENTE DE SIGNAL VIDEO...</span>
      </div>
    );
  }

  const isClosed = sector.status === 'Scellé' || sector.status === 'Abandonné';
  const hasLambda = sector.rebelRisk > 40;
  const hasXen = sector.xenContamination > 30;

  // Dynamic vector outline based on sector type
  const renderSectorVector = () => {
    const id = sector.id;

    if (isClosed) {
      return (
        <svg className="w-full h-full opacity-40" viewBox="0 0 200 120">
          <line x1="20" y1="20" x2="180" y2="100" stroke="#ff3333" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="20" y1="100" x2="180" y2="20" stroke="#ff3333" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="100" y="65" fill="#ff3333" fontSize="8" fontWeight="bold" textAnchor="middle">
            SIGNAL PERDU // CORRUPT
          </text>
        </svg>
      );
    }

    if (id === 'transit_station' || id === 'razor_rail') {
      // Train tracks & station architecture
      return (
        <svg className="w-full h-full opacity-35" viewBox="0 0 200 120" stroke="#00d4ff" strokeWidth="0.8" fill="none">
          {/* Rails */}
          <line x1="10" y1="90" x2="190" y2="90" />
          <line x1="10" y1="95" x2="190" y2="95" />
          {/* Rail Ties */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={15 + i * 15} y1="90" x2={15 + i * 15} y2="95" />
          ))}
          {/* Platform overhead arches */}
          <path d="M 30,90 A 40,40 0 0,1 110,90" />
          <path d="M 90,90 A 40,40 0 0,1 170,90" />
          <line x1="70" y1="10" x2="70" y2="50" />
          <line x1="130" y1="10" x2="130" y2="50" />
          {/* Train silhouette */}
          <rect x="50" y="55" width="100" height="35" rx="3" strokeWidth="1" />
          <line x1="60" y1="65" x2="80" y2="65" />
          <line x1="100" y1="65" x2="140" y2="65" />
        </svg>
      );
    }

    if (id === 'admin_plaza' || id === 'citadel_approach' || id === 'breencast_relay') {
      // Citadel tower rising & structural columns
      return (
        <svg className="w-full h-full opacity-35" viewBox="0 0 200 120" stroke="#00d4ff" strokeWidth="0.8" fill="none">
          {/* Citadel outline in the distance */}
          <polygon points="90,120 100,5 110,120" strokeWidth="1" />
          <line x1="97" y1="20" x2="103" y2="20" />
          <line x1="95" y1="50" x2="105" y2="50" />
          <line x1="93" y1="80" x2="107" y2="80" />
          {/* Checkpoint walls */}
          <rect x="30" y="80" width="40" height="40" />
          <rect x="130" y="80" width="40" height="40" />
          <line x1="70" y1="90" x2="130" y2="90" />
        </svg>
      );
    }

    if (id === 'sewers' || id === 'canals' || id === 'tech_sub') {
      // Pipe grid & tunnel vault
      return (
        <svg className="w-full h-full opacity-35" viewBox="0 0 200 120" stroke="#00d4ff" strokeWidth="0.8" fill="none">
          {/* Sewer vault arches */}
          <circle cx="100" cy="80" r="70" />
          <circle cx="100" cy="80" r="50" />
          {/* Water level */}
          <line x1="30" y1="90" x2="170" y2="90" />
          {/* Side pipe outputs */}
          <rect x="40" y="30" width="20" height="20" rx="10" />
          <rect x="140" y="30" width="20" height="20" rx="10" />
        </svg>
      );
    }

    if (id === 'residential_a' || id === 'residential_b' || id === 'workers_quarter' || id === 'warehouse_sector') {
      // Apartment buildings & windows
      return (
        <svg className="w-full h-full opacity-35" viewBox="0 0 200 120" stroke="#00d4ff" strokeWidth="0.8" fill="none">
          {/* Left Block */}
          <rect x="15" y="20" width="55" height="100" />
          <rect x="25" y="30" width="10" height="15" />
          <rect x="45" y="30" width="10" height="15" />
          <rect x="25" y="60" width="10" height="15" />
          <rect x="45" y="60" width="10" height="15" />
          {/* Right Block */}
          <rect x="95" y="40" width="90" height="80" />
          <rect x="110" y="55" width="15" height="12" />
          <rect x="135" y="55" width="15" height="12" />
          <rect x="160" y="55" width="15" height="12" />
          <rect x="110" y="85" width="15" height="12" />
          <rect x="135" y="85" width="15" height="12" />
          <rect x="160" y="85" width="15" height="12" />
          <line x1="70" y1="70" x2="95" y2="70" />
        </svg>
      );
    }

    // Default ruins, periphery, abandoned hospital
    return (
      <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" stroke="#00d4ff" strokeWidth="0.8" fill="none">
        {/* Debris / Broken walls */}
        <polygon points="10,120 30,80 50,120" />
        <polygon points="40,120 70,60 90,120" />
        <polygon points="140,120 160,70 190,120" />
        <line x1="20" y1="10" x2="180" y2="10" />
        <line x1="20" y1="10" x2="10" y2="40" />
        <line x1="180" y1="10" x2="190" y2="40" />
      </svg>
    );
  };

  return (
    <div className="w-full bg-[#04070a] border border-cyan-500/20 rounded p-3 select-none relative overflow-hidden font-mono text-[10px]">
      
      {/* Dynamic Glitch effects */}
      {glitch && (
        <div className="absolute inset-0 bg-cyan-400/10 mix-blend-color-dodge z-30 pointer-events-none flex flex-col items-center justify-center font-bold text-cyan-400 text-xs">
          <div className="w-full h-1 bg-cyan-500/20 absolute top-1/4 animate-bounce"></div>
          <div className="w-full h-2 bg-cyan-500/10 absolute top-2/3 animate-bounce"></div>
        </div>
      )}

      {/* Camera info Overlay */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center text-[9px] text-cyan-400 font-bold z-20 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-900">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
          REC // CAM-{sector.id.substring(0, 4).toUpperCase()}
        </span>
        <span>{timestamp}</span>
      </div>

      {/* Main viewport */}
      <div className="bg-[#05090e] border border-slate-900 rounded p-1 h-36 flex items-center justify-center relative overflow-hidden">
        
        {/* Render Vector Background */}
        {renderSectorVector()}

        {/* Dynamic Lambda Tag (Rebellion) */}
        {hasLambda && (
          <div className="absolute bottom-2 left-4 text-orange-500/50 font-bold select-none z-10 pointer-events-none scale-120 flex flex-col items-center">
            <span className="font-serif text-2xl font-black">λ</span>
            <span className="text-[7px] font-mono tracking-widest -mt-1 font-semibold">LAMBDA SECTOR</span>
          </div>
        )}

        {/* Dynamic Xen spores or creatures */}
        {hasXen && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Draw Barnacle hanging wireframe */}
            {sector.xenContamination > 60 && (
              <svg className="w-full h-full" viewBox="0 0 200 120">
                {/* Barnacle tongue */}
                <line x1="100" y1="0" x2="100" y2="90" stroke="#a855f7" strokeWidth="0.8" />
                {/* Barnacle teeth/mouth */}
                <polygon points="95,0 100,10 105,0" fill="none" stroke="#a855f7" strokeWidth="0.8" />
                <circle cx="100" cy="90" r="1.5" fill="#a855f7" className="animate-ping" />
              </svg>
            )}

            {/* Glowing spores */}
            <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-purple-500/40 animate-ping"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-purple-500/50 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-purple-500/60 animate-pulse"></div>
          </div>
        )}

        {/* Alarm overlay for fighting / insurgents */}
        {(sector.status === 'Insurgé' || sector.status === 'Zone de combat') && (
          <div className="absolute inset-0 bg-red-950/20 border border-red-500/30 animate-pulse pointer-events-none flex items-center justify-center font-bold text-red-500 text-[10px] tracking-widest">
            WARNING: ENGAGEMENT ACTIVE
          </div>
        )}

        {/* Scanlines layer */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-950/5 to-transparent bg-[size:100%_6px] opacity-45 pointer-events-none"></div>
      </div>

      {/* Telemetry info under feed */}
      <div className="mt-2 grid grid-cols-3 gap-2 bg-[#090d12]/60 border border-slate-900 p-2 rounded text-[8.5px] text-slate-400">
        <div>
          <span>STATUT LOGIQUE</span>
          <span className="block font-bold text-cyan-400 uppercase truncate mt-0.5">{sector.status}</span>
        </div>
        <div>
          <span>INDICE XEN</span>
          <span className={`block font-bold mt-0.5 ${hasXen ? 'text-purple-400 animate-pulse' : 'text-slate-300'}`}>
            {sector.xenContamination}%
          </span>
        </div>
        <div>
          <span>SURVEILLANCE</span>
          <span className="block font-bold text-slate-300 mt-0.5">{sector.surveillance}%</span>
        </div>
      </div>
    </div>
  );
};
