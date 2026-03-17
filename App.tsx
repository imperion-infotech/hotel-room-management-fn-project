
import React, { useState } from 'react';
import { Floor, Room, RoomType, ViewMode } from './types';
import { INITIAL_FLOORS, INITIAL_ROOM_TYPES, INITIAL_ROOMS, ICONS } from './constants';
import Dashboard from './components/Dashboard';
import RoomSettings from './components/RoomSettings';
import RoomDetailPage from './components/RoomDetailPage';
import BookingPanel from './components/BookingPanel';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [floors, setFloors] = useState<Floor[]>(INITIAL_FLOORS);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(INITIAL_ROOM_TYPES);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [activeFloorId, setActiveFloorId] = useState<string | null>(INITIAL_FLOORS[0]?.id || null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // --- FLOOR ACTIONS ---
  const handleAddFloor = (name: string) => {
    if (floors.some(f => f.name.toLowerCase() === name.toLowerCase())) {
      alert(`Floor ${name} already exists.`);
      return;
    }
    const newFloor: Floor = { id: Date.now().toString(), name };
    setFloors(prev => [...prev, newFloor]);
  };

  const handleUpdateFloor = (id: string, name: string) => {
    if (floors.some(f => f.id !== id && f.name.toLowerCase() === name.toLowerCase())) {
      alert(`Another floor with name ${name} already exists.`);
      return;
    }
    setFloors(prev => prev.map(f => f.id === id ? { ...f, name } : f));
  };

  const handleDeleteFloor = (id: string) => {
    if (rooms.some(r => r.floorId === id)) {
      alert("Cannot delete floor. There are rooms assigned to this level.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this floor?")) {
      setFloors(prev => prev.filter(f => f.id !== id));
      if (activeFloorId === id) setActiveFloorId(null);
    }
  };

  // --- ROOM TYPE ACTIONS ---
  const handleAddRoomType = (name: string, price: number) => {
    if (roomTypes.some(rt => rt.name.toLowerCase() === name.toLowerCase())) {
      alert(`Category ${name} already exists.`);
      return;
    }
    const newRT: RoomType = { id: Date.now().toString(), name, defaultPrice: price };
    setRoomTypes(prev => [...prev, newRT]);
  };

  const handleUpdateRoomType = (id: string, name: string, price: number) => {
    if (roomTypes.some(rt => rt.id !== id && rt.name.toLowerCase() === name.toLowerCase())) {
      alert(`Another category with name ${name} already exists.`);
      return;
    }
    setRoomTypes(prev => prev.map(rt => rt.id === id ? { ...rt, name, defaultPrice: price } : rt));
  };

  const handleDeleteRoomType = (id: string) => {
    if (rooms.some(r => r.roomTypeId === id)) {
      alert("Cannot delete category. Units are currently assigned to this room type.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this room category?")) {
      setRoomTypes(prev => prev.filter(rt => rt.id !== id));
    }
  };

  // --- ROOM ACTIONS ---
  const handleAddRoom = (roomData: Omit<Room, 'id'>) => {
    if (rooms.some(r => r.roomNo.toLowerCase() === roomData.roomNo.toLowerCase())) {
      alert(`Room number ${roomData.roomNo} already exists.`);
      return;
    }
    const newRoom: Room = { ...roomData, id: Date.now().toString() };
    setRooms(prev => [...prev, newRoom]);
  };

  const handleUpdateRoom = (id: string, roomData: Omit<Room, 'id'>) => {
    if (rooms.some(r => r.id !== id && r.roomNo.toLowerCase() === roomData.roomNo.toLowerCase())) {
      alert(`Another room with number ${roomData.roomNo} already exists.`);
      return;
    }
    setRooms(prev => prev.map(r => r.id === id ? { ...roomData, id } : r));
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm("Are you sure you want to delete this room unit?")) {
      setRooms(prev => prev.filter(r => r.id !== id));
    }
  };

  const isAdminActive = viewMode.startsWith('SETTINGS_');

  const NavButton = ({ mode, label, icon: Icon, isSubItem = false }: { mode: ViewMode, label: string, icon: any, isSubItem?: boolean }) => {
    const isActive = viewMode === mode;
    return (
      <button 
        onClick={() => setViewMode(mode)}
        className={`w-full flex items-center gap-3 transition-all border-l-4 ${
          isSubItem ? 'pl-12 pr-6 py-3 text-xs' : 'px-8 py-4 text-sm'
        } font-semibold ${
          isActive 
          ? 'bg-slate-50 text-slate-900 border-blue-600 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]' 
          : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Icon className={`${isActive ? 'text-blue-500' : 'text-slate-400'} ${isSubItem ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <span className="tracking-tight">{label}</span>
      </button>
    );
  };

  const currentSelectedRoom = rooms.find(r => r.id === selectedRoomId);

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 bg-slate-50">
      <aside className="w-72 bg-white flex flex-col shrink-0 border-r border-slate-200 z-30 shadow-[4px_0_24px_-8px_rgba(0,0,0,0.08)]">
        <div className="p-10 pb-8">
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
                <span className="text-white font-black text-xl tracking-tighter">I</span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-black text-slate-900 tracking-[0.2em] text-lg leading-none uppercase">IMPERION</h1>
                <span className="text-[8px] font-bold text-blue-600 uppercase tracking-[0.3em] mt-1">Systems v1.0</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2 tracking-[0.2em]">System Date</label>
            <div className="relative group">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
              />
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto pt-2">
          <div className="mb-6">
             <div className="px-8 mb-2">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Navigation</span>
            </div>
            <NavButton mode={ViewMode.DASHBOARD} label="Property Dashboard" icon={ICONS.Grid} />
          </div>

          <div className="pt-4">
            <div className="px-8 mb-2">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Configuration</span>
            </div>
            <button 
                onClick={() => setViewMode(ViewMode.SETTINGS_MENU)}
                className={`w-full flex items-center gap-3 px-8 py-4 text-sm font-semibold transition-all border-l-4 ${
                    isAdminActive 
                    ? 'text-slate-900 border-blue-600 bg-slate-50' 
                    : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
                <ICONS.Settings className={isAdminActive ? 'text-blue-500' : 'text-slate-400'} />
                Room Management
            </button>

            {isAdminActive && (
              <div className="flex flex-col space-y-0 bg-white/50 border-y border-slate-50">
                <NavButton mode={ViewMode.SETTINGS_FLOOR} label="Floor Setup" icon={ICONS.Floor} isSubItem />
                <NavButton mode={ViewMode.SETTINGS_ROOM_TYPE} label="Room Categories" icon={ICONS.RoomType} isSubItem />
                <NavButton mode={ViewMode.SETTINGS_ROOM} label="Unit Inventory" icon={ICONS.Inventory} isSubItem />
              </div>
            )}
          </div>
        </nav>

        <div className="p-8 border-t border-slate-100 flex flex-col items-center gap-1">
          <span className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-black">Imperion Systems</span>
          <span className="text-[8px] text-slate-300 font-bold">V1.0.4 Enterprise</span>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0 z-20 relative">
          <div className="flex items-center gap-10">
            <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <button className="hover:text-blue-600 transition-colors">File</button>
              <button className="hover:text-blue-600 transition-colors">Actions</button>
              <button className="text-red-400 hover:text-red-600 transition-colors" onClick={() => window.location.reload()}>Exit</button>
            </div>
            <div className="h-5 w-px bg-slate-200"></div>
            <div className="flex items-center gap-4 bg-slate-50/50 pl-2 pr-6 py-1.5 rounded-full border border-slate-100 hover:bg-slate-100/50 transition-all cursor-pointer group">
               <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-blue-300 transition-all">
                  <span className="text-[11px] font-black text-blue-600">AD</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[11px] font-black text-slate-900 leading-none mb-1">System Admin</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Full Privileges</span>
               </div>
            </div>
          </div>

          {/* PROPERTY TITLE CENTERED */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-300"></div>
              <h2 className="text-lg font-serif italic font-semibold text-slate-900 tracking-tight">City Centre Inn</h2>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-300"></div>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[8px] font-black text-blue-600 uppercase tracking-[0.6em]">Luxury Boutique Hotel</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
               <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Sync Active</span>
            </div>
            <div className="h-5 w-px bg-slate-200"></div>
            <span className="text-[11px] font-black text-slate-900 tracking-wider">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
            </span>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-hidden">
          {viewMode === ViewMode.DASHBOARD ? (
            <Dashboard 
              floors={floors}
              roomTypes={roomTypes}
              rooms={rooms}
              activeFloorId={activeFloorId}
              onSelectFloor={setActiveFloorId}
              onSelectRoom={(room) => {
                setSelectedRoomId(room.id);
                if (room.status === 'Available') {
                  setViewMode(ViewMode.BOOKING);
                } else {
                  setViewMode(ViewMode.ROOM_DETAIL);
                }
              }}
            />
          ) : viewMode === ViewMode.BOOKING && currentSelectedRoom ? (
            <BookingPanel 
              room={currentSelectedRoom}
              roomType={roomTypes.find(rt => rt.id === currentSelectedRoom.roomTypeId)}
              floor={floors.find(f => f.id === currentSelectedRoom.floorId)}
              onBack={() => setViewMode(ViewMode.DASHBOARD)}
              onConfirm={() => {
                // Update room status to Occupied
                setRooms(prev => prev.map(r => r.id === currentSelectedRoom.id ? { ...r, status: 'Occupied' } : r));
                setViewMode(ViewMode.DASHBOARD);
              }}
            />
          ) : viewMode === ViewMode.ROOM_DETAIL && currentSelectedRoom ? (
            <RoomDetailPage 
              room={currentSelectedRoom}
              roomType={roomTypes.find(rt => rt.id === currentSelectedRoom.roomTypeId)}
              floor={floors.find(f => f.id === currentSelectedRoom.floorId)}
              onBack={() => setViewMode(ViewMode.DASHBOARD)}
            />
          ) : (
            <div className="h-full overflow-y-auto">
              <RoomSettings 
                viewMode={viewMode}
                setViewMode={setViewMode}
                floors={floors}
                roomTypes={roomTypes}
                rooms={rooms}
                onAddFloor={handleAddFloor}
                onUpdateFloor={handleUpdateFloor}
                onDeleteFloor={handleDeleteFloor}
                onAddRoomType={handleAddRoomType}
                onUpdateRoomType={handleUpdateRoomType}
                onDeleteRoomType={handleDeleteRoomType}
                onAddRoom={handleAddRoom}
                onUpdateRoom={handleUpdateRoom}
                onDeleteRoom={handleDeleteRoom}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
