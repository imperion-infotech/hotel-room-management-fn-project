
import React, { useState, useMemo } from 'react';
import { Floor, Room, RoomType, ViewMode, RoomStatus } from '../types';

interface RoomSettingsProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  floors: Floor[];
  roomTypes: RoomType[];
  rooms: Room[];
  onAddFloor: (name: string) => void;
  onUpdateFloor: (id: string, name: string) => void;
  onDeleteFloor: (id: string) => void;
  onAddRoomType: (name: string, price: number) => void;
  onUpdateRoomType: (id: string, name: string, price: number) => void;
  onDeleteRoomType: (id: string) => void;
  onAddRoom: (room: Omit<Room, 'id'>) => void;
  onUpdateRoom: (id: string, room: Omit<Room, 'id'>) => void;
  onDeleteRoom: (id: string) => void;
}

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 border-b border-slate-200 pb-6">
    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">{title}</h2>
    <p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-wider">{subtitle}</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-red-500 uppercase tracking-wider animate-pulse">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    {message}
  </div>
);

// --- MODULE 1: FLOOR SETUP ---
const FloorSetup: React.FC<{ 
  floors: Floor[], 
  onAdd: (n: string) => void, 
  onUpdate: (id: string, n: string) => void,
  onDelete: (id: string) => void 
}> = ({ floors, onAdd, onUpdate, onDelete }) => {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalVal = e.target.value;
    const numericVal = originalVal.replace(/[^0-9]/g, '');
    
    if (originalVal !== numericVal) {
      setError("Invalid value");
    } else {
      if (error === "Invalid value") setError("");
    }
    setName(numericVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumeric = /^[0-9]$/.test(e.key);
    const isControlKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Escape'].includes(e.key);
    
    if (!isNumeric && !isControlKey) {
      setError("Invalid value");
      e.preventDefault();
    } else {
      if (error === "Invalid value") setError("");
    }
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    
    if (!cleanName) {
      setError("Floor number is not chosen yet.");
      return;
    }

    const isDuplicate = floors.some(f => f.name === cleanName && f.id !== editingId);
    if (isDuplicate) {
      setError(`Floor "${cleanName}" already exists in the system.`);
      return;
    }

    if (editingId) {
      onUpdate(editingId, cleanName);
      setEditingId(null);
    } else {
      onAdd(cleanName);
    }
    setName('');
    setError('');
  };

  // Sorting for numeric order
  const sortedFloors = useMemo(() => [...floors].sort((a, b) => Number(a.name) - Number(b.name)), [floors]);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <SectionHeader title="Floor Configuration" subtitle="Define property levels and structural hierarchy" />
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Entry Form</span>
        </div>
        <form onSubmit={validateAndSubmit} className="p-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Floor Number</label>
            <div className="flex gap-4">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={name}
                onChange={handleNumericInput}
                onKeyDown={handleKeyDown}
                onPaste={(e) => {
                  const paste = e.clipboardData.getData('text');
                  if (!/^\d+$/.test(paste)) {
                    setError("Invalid value");
                    e.preventDefault();
                  }
                }}
                placeholder=""
                className={`flex-1 px-4 py-3 border rounded-lg text-sm font-bold outline-none transition-all ${error ? 'border-red-500 bg-red-50 shadow-[0_0_0_4px_rgba(239,68,68,0.05)]' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50'}`}
              />
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                {editingId ? 'Update Record' : 'Add to System'}
              </button>
              {editingId && (
                <button onClick={() => { setEditingId(null); setName(''); setError(''); }} type="button" className="bg-slate-100 text-slate-600 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest">Cancel</button>
              )}
            </div>
            {error && <ErrorDisplay message={error} />}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="w-16 px-6 py-4"></th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Floor Name</th>
              <th className="w-16 px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedFloors.map(f => (
              <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <button onClick={() => { setEditingId(f.id); setName(f.name); setError(''); }} className="text-slate-400 hover:text-blue-600 transition-colors" title="Edit Floor">
                    <EditIcon />
                  </button>
                </td>
                <td className="px-6 py-4 font-black text-slate-900">Floor {f.name}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => onDelete(f.id)} className="text-slate-300 hover:text-red-600 transition-all p-2 rounded-full hover:bg-red-50" title="Delete Floor">
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
            {floors.length === 0 && (
              <tr><td colSpan={3} className="p-10 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No data records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- MODULE 2: ROOM CATEGORIES ---
const RoomTypeSetup: React.FC<{ 
  roomTypes: RoomType[], 
  onAdd: (n: string, p: number) => void,
  onUpdate: (id: string, n: string, p: number) => void,
  onDelete: (id: string) => void
}> = ({ roomTypes, onAdd, onUpdate, onDelete }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    
    if (!cleanName) {
      setError("Room type is not chosen yet.");
      return;
    }

    if (price <= 0) {
      setError("Base rate must be greater than zero.");
      return;
    }

    const isDuplicate = roomTypes.some(rt => rt.name.toLowerCase() === cleanName.toLowerCase() && rt.id !== editingId);
    if (isDuplicate) {
      setError(`Category "${cleanName}" is already defined.`);
      return;
    }

    if (editingId) {
      onUpdate(editingId, cleanName, price);
      setEditingId(null);
    } else {
      onAdd(cleanName, price);
    }
    setName('');
    setPrice(0);
    setError('');
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <SectionHeader title="Room Categories" subtitle="Manage revenue classes and pricing standards" />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
        <form onSubmit={validateAndSubmit} className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category Name</label>
            <input type="text" value={name} onChange={e => { setName(e.target.value); setError(''); }} placeholder="" className={`px-4 py-3 border rounded-lg text-sm font-bold outline-none transition-all ${error && !name.trim() ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50'}`} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Rate ($)</label>
            <input type="number" value={price || ''} onChange={e => { setPrice(Number(e.target.value)); setError(''); }} placeholder="" className="px-4 py-3 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              {editingId ? 'Update' : 'Save Category'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setName(''); setPrice(0); setError(''); }} type="button" className="bg-slate-100 text-slate-600 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest">X</button>
            )}
          </div>
          {error && <div className="col-span-full"><ErrorDisplay message={error} /></div>}
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="w-16 px-6 py-4"></th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Standard Rate</th>
              <th className="w-20 px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roomTypes.map(rt => (
              <tr key={rt.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <button onClick={() => { setEditingId(rt.id); setName(rt.name); setPrice(rt.defaultPrice); setError(''); }} className="text-slate-400 hover:text-blue-600 transition-colors" title="Edit Category">
                    <EditIcon />
                  </button>
                </td>
                <td className="px-6 py-4 font-black text-slate-900">{rt.name}</td>
                <td className="px-6 py-4 text-right font-bold text-blue-600">${rt.defaultPrice.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDelete(rt.id)} 
                    className="text-slate-300 hover:text-red-600 transition-all p-2 rounded-full hover:bg-red-50 inline-flex items-center justify-center"
                    title="Remove Category"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
            {roomTypes.length === 0 && (
              <tr><td colSpan={4} className="p-10 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No room categories defined</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- MODULE 3: UNIT INVENTORY ---
const RoomInventory: React.FC<{ 
  floors: Floor[], 
  roomTypes: RoomType[], 
  rooms: Room[],
  onAdd: (r: Omit<Room, 'id'>) => void,
  onUpdate: (id: string, r: Omit<Room, 'id'>) => void,
  onDelete: (id: string) => void
}> = ({ floors, roomTypes, rooms, onAdd, onUpdate, onDelete }) => {
  const [no, setNo] = useState('');
  const [floorId, setFloorId] = useState('');
  const [roomTypeId, setRoomTypeId] = useState('');
  const [status, setStatus] = useState<RoomStatus>('Available');
  const [smoking, setSmoking] = useState(false);
  const [handicap, setHandicap] = useState(false);
  const [nonRoom, setNonRoom] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalVal = e.target.value;
    const numericVal = originalVal.replace(/[^0-9]/g, '');
    
    if (originalVal !== numericVal) {
      setError("Invalid value");
    } else {
      if (error === "Invalid value") setError("");
    }
    setNo(numericVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumeric = /^[0-9]$/.test(e.key);
    const isControlKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Escape'].includes(e.key);
    
    if (!isNumeric && !isControlKey) {
      setError("Invalid value");
      e.preventDefault();
    } else {
      if (error === "Invalid value") setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNo = no.trim();

    if (!cleanNo) {
      setError("Room number is not chosen yet.");
      return;
    }
    if (!floorId) {
      setError("Floor is not chosen yet.");
      return;
    }
    if (!roomTypeId) {
      setError("Room type is not chosen yet.");
      return;
    }

    // MANDATORY LOGIC: Room number must start with floor number
    const selectedFloor = floors.find(f => f.id === floorId);
    if (selectedFloor && !cleanNo.startsWith(selectedFloor.name)) {
      setError(`Room number must correspond to the selected floor level (e.g., Floor ${selectedFloor.name} requires room ${selectedFloor.name}xx).`);
      return;
    }

    const isDuplicate = rooms.some(r => r.roomNo === cleanNo && r.id !== editingId);
    if (isDuplicate) {
      setError(`Room number "${cleanNo}" already exists in inventory.`);
      return;
    }
    
    const data = { 
      roomNo: cleanNo, 
      floorId, 
      roomTypeId, 
      isSmoking: nonRoom ? false : smoking, 
      isHandicap: nonRoom ? false : handicap, 
      isNonRoom: nonRoom, 
      status 
    };

    if (editingId) {
      onUpdate(editingId, data);
      setEditingId(null);
    } else {
      onAdd(data);
    }
    resetForm();
  };

  const resetForm = () => {
    setNo('');
    setFloorId('');
    setRoomTypeId('');
    setSmoking(false);
    setHandicap(false);
    setNonRoom(false);
    setStatus('Available');
    setEditingId(null);
    setError('');
  };

  const sortedFloors = useMemo(() => [...floors].sort((a, b) => Number(a.name) - Number(b.name)), [floors]);
  
  // Logic: Room number cannot be edited after first check-in (Status != Available/Dirty/Clean/Maintenance in real-world, 
  // but for demo we treat editing existing non-Available room as restricted).
  const isRoomNoReadOnly = useMemo(() => {
    if (!editingId) return false;
    const room = rooms.find(r => r.id === editingId);
    return room ? room.status === 'Occupied' : false;
  }, [editingId, rooms]);

  const sortedRooms = useMemo(() => 
    [...rooms].sort((a, b) => a.roomNo.localeCompare(b.roomNo, undefined, { numeric: true })),
    [rooms]
  );

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <SectionHeader title="Unit Inventory" subtitle="Master registry of physical property assets" />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Room Number</label>
              <input 
                type="text"
                inputMode="numeric"
                autoComplete="off"
                disabled={isRoomNoReadOnly}
                value={no} 
                onChange={handleNumericInput}
                onKeyDown={handleKeyDown}
                placeholder="" 
                className={`px-4 py-3 border rounded-lg text-sm font-bold outline-none transition-all ${isRoomNoReadOnly ? 'bg-slate-50 cursor-not-allowed text-slate-400' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50'} ${error && !no.startsWith(floors.find(f => f.id === floorId)?.name || '') ? 'border-red-500 bg-red-50' : ''}`} 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Floor Level</label>
              <select value={floorId} onChange={e => { setFloorId(e.target.value); setError(''); }} className={`px-4 py-3 border rounded-lg text-sm font-bold bg-white focus:border-blue-500 outline-none transition-all ${error === "Floor is not chosen yet." ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}>
                <option value="">Select Floor...</option>
                {sortedFloors.map(f => <option key={f.id} value={f.id}>Floor {f.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
              <select value={roomTypeId} onChange={e => { setRoomTypeId(e.target.value); setError(''); }} className={`px-4 py-3 border rounded-lg text-sm font-bold bg-white focus:border-blue-500 outline-none transition-all ${error === "Room type is not chosen yet." ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}>
                <option value="">Select Category...</option>
                {roomTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Status</label>
              <select value={status} disabled={nonRoom} onChange={e => setStatus(e.target.value as RoomStatus)} className={`px-4 py-3 border border-slate-200 rounded-lg text-sm font-bold bg-white focus:border-blue-500 outline-none ${nonRoom ? 'opacity-50' : ''}`}>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Dirty">Dirty</option>
                <option value="Clean">Clean</option>
                <option value="Out of Order">Out of Order</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 items-center bg-slate-50 p-6 rounded-xl border border-slate-200">
             <label className={`flex items-center gap-3 cursor-pointer transition-opacity ${nonRoom ? 'opacity-30 pointer-events-none' : ''}`}>
               <input type="checkbox" checked={smoking} onChange={e => setSmoking(e.target.checked)} className="w-5 h-5 accent-blue-600" />
               <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Smoking Allowed</span>
             </label>
             <label className={`flex items-center gap-3 cursor-pointer transition-opacity ${nonRoom ? 'opacity-30 pointer-events-none' : ''}`}>
               <input type="checkbox" checked={handicap} onChange={e => setHandicap(e.target.checked)} className="w-5 h-5 accent-blue-600" />
               <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Handicap Accessible</span>
             </label>
             <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
             <label className="flex items-center gap-3 cursor-pointer">
               <input type="checkbox" checked={nonRoom} onChange={e => setNonRoom(e.target.checked)} className="w-5 h-5 accent-red-600" />
               <span className="text-xs font-black text-red-600 uppercase tracking-wider">Non-Room / Service Entity</span>
             </label>
          </div>

          <div className="mt-8 flex justify-end gap-3 items-center">
            {error && <ErrorDisplay message={error} />}
            <div className="flex-1"></div>
            {editingId && <button onClick={resetForm} type="button" className="px-8 py-3 bg-slate-100 text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest">Cancel</button>}
            <button type="submit" className="bg-slate-900 text-white px-12 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
              {editingId ? 'Update Inventory' : 'Register Unit'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="w-16 px-6 py-4"></th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Room #</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Status</th>
              <th className="w-16 px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedRooms.map(r => (
              <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <button onClick={() => { setEditingId(r.id); setNo(r.roomNo); setFloorId(r.floorId); setRoomTypeId(r.roomTypeId); setSmoking(r.isSmoking); setHandicap(r.isHandicap); setNonRoom(r.isNonRoom); setStatus(r.status); setError(''); }} className="text-slate-400 hover:text-blue-600 transition-colors" title="Edit Unit">
                    <EditIcon />
                  </button>
                </td>
                <td className="px-6 py-4 font-black text-slate-900">{r.roomNo}</td>
                <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Floor {floors.find(f => f.id === r.floorId)?.name}</td>
                <td className="px-6 py-4 text-xs font-bold text-blue-600 uppercase">{roomTypes.find(rt => rt.id === r.roomTypeId)?.name}</td>
                <td className="px-6 py-4">
                  {!r.isNonRoom ? (
                    <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter ${
                      r.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                      r.status === 'Occupied' ? 'bg-rose-100 text-rose-700' : 
                      r.status === 'Dirty' ? 'bg-amber-100 text-amber-700' :
                      r.status === 'Clean' ? 'bg-cyan-100 text-cyan-700' :
                      r.status === 'Under Maintenance' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {r.status}
                    </span>
                  ) : (
                    <span className="text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter bg-slate-100 text-slate-400">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => onDelete(r.id)} className="text-slate-300 hover:text-red-600 transition-all p-2 rounded-full hover:bg-red-50" title="Remove Unit">
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RoomSettings: React.FC<RoomSettingsProps> = (props) => {
  const { viewMode } = props;

  switch (viewMode) {
    case ViewMode.SETTINGS_FLOOR:
      return <FloorSetup floors={props.floors} onAdd={props.onAddFloor} onUpdate={props.onUpdateFloor} onDelete={props.onDeleteFloor} />;
    case ViewMode.SETTINGS_ROOM_TYPE:
      return <RoomTypeSetup roomTypes={props.roomTypes} onAdd={props.onAddRoomType} onUpdate={props.onUpdateRoomType} onDelete={props.onDeleteRoomType} />;
    case ViewMode.SETTINGS_ROOM:
      return <RoomInventory floors={props.floors} roomTypes={props.roomTypes} rooms={props.rooms} onAdd={props.onAddRoom} onUpdate={props.onUpdateRoom} onDelete={props.onDeleteRoom} />;
    default:
      return (
        <div className="p-20 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-4">Configuration Portal</h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-sm mx-auto">Select a management module from the sidebar to begin property setup</p>
          </div>
        </div>
      );
  }
};

export default RoomSettings;
