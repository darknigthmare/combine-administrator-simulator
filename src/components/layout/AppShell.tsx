import React from 'react';
import { TopStatusBar } from './TopStatusBar';
import { Sidebar } from './Sidebar';
import { AlertFeed } from './AlertFeed';
import { useGameStore } from '../../store/gameStore';

interface AppShellProps {
  currentTab: string;
  setTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ currentTab, setTab, children }) => {
  const { settings } = useGameStore();

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden bg-[#070b0e] text-slate-100 ${settings.scanlinesEnabled ? 'scanlines' : ''}`}>
      {/* Top Header Stats Bar */}
      <TopStatusBar />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar currentTab={currentTab} setTab={setTab} />

        {/* Content Area */}
        <main className="flex-1 bg-[#090d12]/90 flex flex-col overflow-y-auto p-6 relative">
          <div className="max-w-6xl w-full mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Right Side Alert Feed */}
        <AlertFeed />
      </div>
    </div>
  );
};
