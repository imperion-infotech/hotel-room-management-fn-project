
import React from 'react';
import { Room, RoomType } from '../types';
import { ICONS } from '../constants';

interface RoomCardProps {
  room: Room;
  roomType?: RoomType;
  onClick: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, roomType, onClick }) => {
  if (room.isNonRoom) {
    return (
      <div className="bg-slate-200 border border-slate-300 rounded shadow-sm h-24 flex items-center justify-center cursor-not-allowed grayscale opacity-60">
        <div className="text-center">
          <div className="text-slate-500 font-bold text-sm">{room.roomNo}</div>
          <div className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Utility Area</div>
        </div>
      </div>
    );
  }

  // Mandatory Status Color Mapping:
  const statusColors = {
    Available: 'border-r-emerald-500',
    Occupied: 'border-r-rose-500',
    Dirty: 'border-r-amber-700',
    Clean: 'border-r-cyan-500',
    'Out of Order': 'border-r-slate-800',
    'Under Maintenance': 'border-r-indigo-600',
  };

  const borderColorClass = statusColors[room.status] || 'border-r-slate-300';

  return (
    <button
      onClick={() => onClick(room)}
      className={`bg-white border border-slate-200 border-r-4 ${borderColorClass} rounded shadow-sm ${room.status === 'Occupied' || room.status === 'Available' ? 'hover:shadow-md hover:border-blue-400 cursor-pointer' : 'cursor-default'} transition-all h-28 p-3 flex flex-col justify-between text-left group`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors">
            {room.roomNo}
          </span>
          <span className={`text-[8px] font-black uppercase tracking-tighter ${
            room.status === 'Available' ? 'text-emerald-600' : 
            room.status === 'Occupied' ? 'text-rose-600' : 
            room.status === 'Dirty' ? 'text-amber-700' :
            room.status === 'Clean' ? 'text-cyan-600' :
            room.status === 'Under Maintenance' ? 'text-indigo-600' :
            'text-slate-500'
          }`}>
            {room.status}
          </span>
        </div>
        <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 tracking-tighter">
          {roomType?.name || '??'}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          {room.isSmoking ? (
            <div title="Smoking Allowed" className="flex items-center gap-1">
              <ICONS.Smoking className="text-rose-400 w-3 h-3" />
              <span className="text-[7px] font-black text-rose-400 uppercase">SMK</span>
            </div>
          ) : (
            <div title="Non-Smoking" className="flex items-center gap-1">
              <span className="text-[7px] font-black text-emerald-500 uppercase">NS</span>
            </div>
          )}
          {room.isHandicap && (
            <div title="Handicap Accessible">
              <ICONS.Handicap className="text-blue-400 w-3 h-3" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default RoomCard;
