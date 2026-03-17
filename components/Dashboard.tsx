
import React, { useMemo } from 'react';
import { Floor, Room, RoomType } from '../types';
import RoomCard from './RoomCard';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  floors: Floor[];
  roomTypes: RoomType[];
  rooms: Room[];
  activeFloorId: string | null;
  onSelectFloor: (id: string | null) => void;
  onSelectRoom: (room: Room) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  floors, 
  roomTypes, 
  rooms, 
  activeFloorId, 
  onSelectFloor,
  onSelectRoom
}) => {
  const filteredRooms = useMemo(() => {
    // If no floor is selected, show nothing or first floor (App.tsx handles default)
    // Here we strictly filter by activeFloorId
    if (!activeFloorId) return [];

    const filtered = rooms.filter(r => r.floorId === activeFloorId);
    
    return [...filtered].sort((a, b) => 
      a.roomNo.localeCompare(b.roomNo, undefined, { numeric: true })
    );
  }, [rooms, activeFloorId]);

  // Sorting: Floors must always appear in numeric order
  const sortedFloors = useMemo(() => 
    [...floors].sort((a, b) => Number(a.name) - Number(b.name)),
    [floors]
  );

  const stats = useMemo(() => {
    const total = rooms.filter(r => !r.isNonRoom).length;
    const occupied = rooms.filter(r => r.status === 'Occupied').length;
    const dirty = rooms.filter(r => r.status === 'Dirty').length;
    const available = rooms.filter(r => r.status === 'Available').length;
    const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

    return { total, occupied, dirty, available, occupancyRate };
  }, [rooms]);

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Quick Stats Bar */}
      <div className="bg-slate-900 px-10 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Occupancy Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white">{stats.occupancyRate}%</span>
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.occupancyRate}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-blue-500"
                ></motion.div>
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Total Units</span>
            <span className="text-xl font-black text-white">{stats.total}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Available</span>
            <span className="text-xl font-black text-emerald-400">{stats.available}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Dirty / Cleaning</span>
            <span className="text-xl font-black text-amber-400">{stats.dirty}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest transition-all">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-[10px] font-black text-white uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20">
            Night Audit
          </button>
        </div>
      </div>

      {/* Enhanced Enterprise Floor Selector Bar */}
      <div className="bg-white border-b border-slate-200 px-10 py-4 flex items-center gap-8 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] z-10">
        <div className="flex items-center shrink-0">
          <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] border-r border-slate-200 pr-8 py-2">Floor Navigation</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {sortedFloors.map(floor => (
            <button
              key={floor.id}
              onClick={() => onSelectFloor(floor.id)}
              className={`group relative px-6 py-3 flex flex-col items-center justify-center rounded-xl transition-all duration-300 outline-none border ${
                activeFloorId === floor.id 
                ? 'bg-blue-600 border-blue-700 text-white shadow-lg shadow-blue-200' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
            >
              <span className={`text-[9px] font-black uppercase tracking-widest mb-0.5 transition-colors ${activeFloorId === floor.id ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-400'}`}>Level</span>
              <span className="text-xl font-black leading-none tracking-tighter">
                {floor.name}
              </span>
              
              {activeFloorId === floor.id && (
                <motion.div 
                  layoutId="activeFloorIndicator"
                  className="absolute -bottom-1 w-2 h-2 bg-blue-700 rotate-45 rounded-sm"
                ></motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Room Grid Area */}
      <div className="flex-1 overflow-y-auto p-10">
        <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">Live Unit Status</h2>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {activeFloorId ? `Floor ${floors.find(f => f.id === activeFloorId)?.name} Management` : 'Select a Floor'}
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 bg-white px-8 py-5 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700"></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Dirty</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Clean</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">OOO</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Maint.</span>
                </div>
            </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFloorId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {filteredRooms.length === 0 ? (
              <div className="h-96 flex flex-col items-center justify-center text-slate-400 space-y-6 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">No matching units found for selected criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 pb-20">
                {filteredRooms.map(room => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    roomType={roomTypes.find(rt => rt.id === room.roomTypeId)}
                    onClick={(r) => !r.isNonRoom && (r.status === 'Occupied' || r.status === 'Available') && onSelectRoom(r)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
