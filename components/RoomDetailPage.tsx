
import React from 'react';
import { Room, RoomType, Floor } from '../types';

interface RoomDetailPageProps {
  room: Room;
  roomType: RoomType | undefined;
  floor: Floor | undefined;
  onBack: () => void;
}

const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ room, roomType, floor, onBack }) => {
  // Dummy guest data as per PMS requirements
  const guestInfo = {
    fullName: room.status === 'Occupied' ? 'MR. JOHNATHAN FREDERICK DOE' : '--',
    phone: room.status === 'Occupied' ? '+1 (555) 902-1432' : '--',
    email: room.status === 'Occupied' ? 'john.doe@enterprise-guest.com' : '--',
    address: room.status === 'Occupied' ? '1248 Oakwood Avenue, Beverly Hills, CA 90210' : '--',
    idType: room.status === 'Occupied' ? 'PASSPORT' : '--',
    idNumber: room.status === 'Occupied' ? 'A1298440-Z' : '--',
    checkIn: room.status === 'Occupied' ? '2026-06-01 14:30' : '--',
    checkOut: room.status === 'Occupied' ? '2026-06-08 11:00' : '--',
    adults: room.status === 'Occupied' ? 2 : 0,
    children: room.status === 'Occupied' ? 1 : 0,
    duration: room.status === 'Occupied' ? '7 NIGHTS' : '0 NIGHTS'
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Detail Header */}
      <header className="px-10 py-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/50">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 hover:bg-white hover:border-blue-600 transition-all text-slate-500 hover:text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Room Details – {room.roomNo}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Registration File & Folio Management</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-lg border border-slate-300 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">Print Form</button>
          <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">Check Out Guest</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-10 space-y-12 max-w-7xl mx-auto w-full">
        
        {/* SECTION 1: GUEST PERSONAL DETAILS */}
        <section>
          <div className="mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-slate-200"></span>
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Section 01: Guest Personal Details</h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>
          
          <div className="grid grid-cols-12 gap-10">
            {/* Left Side: Uploads */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-6">
              <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-blue-400 hover:bg-blue-50/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">Upload Guest Document</span>
                <p className="text-[9px] text-slate-300 mt-2">PDF, JPG, PNG (Max 5MB)</p>
              </div>

              <div className="aspect-[2/1] w-full rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center p-4 group cursor-pointer hover:bg-white transition-all">
                <div className="text-slate-300 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Signature Upload</span>
              </div>
            </div>

            {/* Right Side: Identity Details */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              <div className="bg-slate-50/30 rounded-3xl border border-slate-100 p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Full Guest Name</label>
                    <p className="text-lg font-black text-slate-900">{guestInfo.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Contact Number</label>
                    <p className="text-lg font-black text-slate-900">{guestInfo.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Address</label>
                    <p className="text-sm font-bold text-blue-600 underline underline-offset-4">{guestInfo.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ID Verification Type</label>
                    <p className="text-sm font-black text-slate-700">{guestInfo.idType}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ID Number</label>
                    <p className="text-sm font-black text-slate-700">{guestInfo.idNumber}</p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Residential Address</label>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed max-w-xl">{guestInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ROOM ACCOMMODATION DETAILS */}
        <section className="pb-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-slate-200"></span>
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Section 02: Room Accommodation Details</h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-slate-100">
              <div className="p-8 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Room Number</label>
                <p className="text-2xl font-black text-slate-900">{room.roomNo}</p>
              </div>
              <div className="p-8 space-y-1 border-t-0">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Unit Category</label>
                <p className="text-lg font-black text-blue-600 uppercase">{roomType?.name || '--'}</p>
              </div>
              <div className="p-8 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Level / Floor</label>
                <p className="text-lg font-black text-slate-700 uppercase">FLOOR {floor?.name || '--'}</p>
              </div>
              <div className="p-8 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Nightly Rate</label>
                <p className="text-lg font-black text-emerald-600 tracking-tight">₹{roomType?.defaultPrice.toFixed(2)}</p>
              </div>
              
              <div className="p-8 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Check-In Registry</label>
                <p className="text-sm font-black text-slate-800 uppercase">{guestInfo.checkIn}</p>
              </div>
              <div className="p-8 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Est. Check-Out</label>
                <p className="text-sm font-black text-slate-800 uppercase">{guestInfo.checkOut}</p>
              </div>
              <div className="p-8 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Occupancy Count</label>
                <p className="text-sm font-black text-slate-800 uppercase">
                  {guestInfo.adults} ADULTS / {guestInfo.children} CHILD
                </p>
              </div>
              <div className="p-8 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Stay Duration</label>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black tracking-widest">
                  {guestInfo.duration}
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Special Remarks / Preferences</label>
                <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                  {room.isSmoking ? 'SMOKING UNIT PREFERRED. ' : ''}
                  {room.isHandicap ? 'HANDICAP ACCESSIBILITY REQUIRED. ' : ''}
                  NO ADDITIONAL REMARKS FILED FOR THIS STAY.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-end min-w-[240px]">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Calculated Balance</span>
                 <span className="text-3xl font-black text-slate-900 tracking-tighter">
                   ₹{((roomType?.defaultPrice || 0) * (room.status === 'Occupied' ? 7 : 0)).toFixed(2)}
                 </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoomDetailPage;
