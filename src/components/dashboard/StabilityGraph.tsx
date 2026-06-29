import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const StabilityGraph: React.FC = () => {
  const { dayReports, stats } = useGameStore();

  // Create chart data including Day 0 setup
  const chartData = [
    {
      name: 'Jour 0',
      'Stabilité': 60,
      'Rébellion': 20,
      'Xen': 15,
    },
    ...dayReports.map(report => ({
      name: `Jour ${report.day}`,
      'Stabilité': report.globalStats.stability,
      'Rébellion': report.globalStats.rebelActivity,
      'Xen': report.globalStats.xenContamination,
    }))
  ];

  return (
    <div className="border border-slate-800 bg-[#0d141b]/60 rounded p-4 flex flex-col gap-3 font-mono text-xs">
      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
        <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
          Évolution Historique Urbaine
        </h3>
        <span className="text-slate-500 text-[10px]">LIAISON DE DONNÉES TEMPS RÉEL</span>
      </div>

      <div className="h-64 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={9}
                tickLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={9}
                domain={[0, 100]} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#090d11', borderColor: '#334155', color: '#e2e8f0', fontFamily: 'monospace', fontSize: 10 }}
              />
              <Legend 
                wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
              />
              <Line 
                type="monotone" 
                dataKey="Stabilité" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="Rébellion" 
                stroke="#ff7700" 
                strokeWidth={1.5}
                dot={{ r: 1 }}
              />
              <Line 
                type="monotone" 
                dataKey="Xen" 
                stroke="#a855f7" 
                strokeWidth={1.5}
                dot={{ r: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 italic text-[10px]">
            Flux de données insuffisant. En attente de fin de journée administrative.
          </div>
        )}
      </div>
    </div>
  );
};
