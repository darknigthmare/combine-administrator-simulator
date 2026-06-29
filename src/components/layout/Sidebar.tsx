import React from 'react';
import { Terminal, Map, Shield, Flame, Biohazard, Users, FileText, Settings, LogOut } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setTab }) => {
  const { resetGame } = useGameStore();

  const navItems = [
    { id: 'dashboard', label: 'Console Centrale', icon: Terminal },
    { id: 'map', label: 'Carte Tactique', icon: Map },
    { id: 'combine', label: 'Forces Combine', icon: Shield },
    { id: 'resistance', label: 'Activité Lambda', icon: Flame },
    { id: 'xen', label: 'Menaces Xen', icon: Biohazard },
    { id: 'citizens', label: 'Contrôle Civil', icon: Users },
    { id: 'reports', label: 'Directives & Archives', icon: FileText },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#090d11] border-r border-slate-800 flex flex-col justify-between font-mono text-xs select-none">
      {/* Upper Brand / Logo */}
      <div className="p-4 border-b border-slate-800 bg-[#070b0e] flex flex-col gap-1">
        <span className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold">CIVIL AUTHORITY</span>
        <span className="text-slate-400 font-semibold text-xs">INTERFACE PROTOCOLE</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200 border text-left ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] font-bold'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 hover:border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer System Control */}
      <div className="p-4 border-t border-slate-800 bg-[#070b0e] space-y-2">
        <div className="text-[9px] text-slate-500 flex flex-col">
          <span>OVERSIGHT ANALYSIS NODE</span>
          <span className="text-slate-400">VERSION 1.7.0.24</span>
        </div>
        
        <button
          onClick={() => {
            if (confirm('Voulez-vous réinitialiser l\'administration ? Votre progression sera perdue.')) {
              resetGame();
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-red-950/40 bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Rupture Liaison</span>
        </button>
      </div>
    </aside>
  );
};
