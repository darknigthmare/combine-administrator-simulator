import React from 'react';
import { CitySector } from '../../types/game';

interface SectorCardProps {
  sector: CitySector;
  onClick: () => void;
}

export const SectorCard: React.FC<SectorCardProps> = ({ sector, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border border-slate-800 bg-[#0d141b]/40 hover:bg-[#0d141b]/60 rounded p-3 text-left transition-all"
    >
      <div className="font-bold text-slate-200">{sector.name}</div>
      <div className="text-[10px] text-slate-500 mt-1">Status : {sector.status}</div>
    </button>
  );
};
