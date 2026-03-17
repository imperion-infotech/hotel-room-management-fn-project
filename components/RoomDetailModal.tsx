
import React from 'react';
import { Room, RoomType, GuestReservation } from '../types';

interface RoomDetailModalProps {
  room: Room | null;
  roomType: RoomType | undefined;
  onClose: () => void;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, roomType, onClose }) => {
  if (!room) return null;

  // Dummy reservation data
  // Fix: Added missing fields (phone, email, address, idType, idNumber, adults, children) to satisfy GuestReservation interface
  const dummyRes: GuestReservation = {
    roomNo: room.roomNo,
    roomType: roomType?.name || 'Unknown',
    guestName: 'Johnathan Doe',
    phone: '555-010-9988',
    email: 'j.doe@example.com',
    address: '123 Enterprise Way, Tech City, TC 10101',
    idType: 'Passport',
    idNumber: 'P-99228833',
    checkIn: '2026-06-15',
    checkOut: '2026-06-20',
    adults: 2,
    children: 0,
    charges: (roomType?.defaultPrice || 0) * 5,
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Room Details - {dummyRes.roomNo}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold tracking-tight">Room Type</label>
              <p className="text-slate-900 font-medium">{dummyRes.roomType}</p>
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold tracking-tight">Rate (Per Night)</label>
              <p className="text-slate-900 font-medium">${roomType?.defaultPrice}.00</p>
            </div>
          </div>
          <hr className="border-slate-100" />
          <div>
            <label className="text-xs text-slate-500 uppercase font-bold tracking-tight">Guest Name</label>
            <p className="text-lg text-slate-900 font-semibold">{dummyRes.guestName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold tracking-tight">Check-In</label>
              <p className="text-slate-900 font-medium">{dummyRes.checkIn}</p>
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold tracking-tight">Check-Out</label>
              <p className="text-slate-900 font-medium">{dummyRes.checkOut}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded border border-slate-100 mt-4 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Estimated Charges</span>
            <span className="text-xl font-bold text-slate-900">${dummyRes.charges}.00</span>
          </div>
        </div>
        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-all"
          >
            Close
          </button>
          <button 
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 shadow-md shadow-blue-100 transition-all"
          >
            Manage Folio
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;
