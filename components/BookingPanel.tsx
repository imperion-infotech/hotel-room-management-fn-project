
import React, { useState, useEffect } from 'react';
import { Room, RoomType, Floor } from '../types';

interface BookingPanelProps {
  room: Room;
  roomType: RoomType | undefined;
  floor: Floor | undefined;
  onBack: () => void;
  onConfirm: (bookingData: any) => void;
}

const BookingPanel: React.FC<BookingPanelProps> = ({ room, roomType, floor, onBack, onConfirm }) => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idType, setIdType] = useState('Passport');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [nationality, setNationality] = useState('');
  
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkInTime, setCheckInTime] = useState('14:00');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [nights, setNights] = useState(1);
  
  const [pricePerNight, setPricePerNight] = useState(roomType?.defaultPrice || 0);
  const [extraBedCharges, setExtraBedCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [taxRate] = useState(0.12); // 12% Tax

  // Set initial checkout date
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    setCheckOutDate(date.toISOString().split('T')[0]);
  }, []);

  // Calculate nights when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 1);
    }
  }, [checkInDate, checkOutDate]);

  const handleStayDuration = (days: number) => {
    const start = new Date(checkInDate);
    const end = new Date(start);
    end.setDate(start.getDate() + days);
    setCheckOutDate(end.toISOString().split('T')[0]);
    setNights(days);
  };

  const subtotal = pricePerNight * nights;
  const totalBeforeTax = subtotal + extraBedCharges - discount;
  const taxes = totalBeforeTax * taxRate;
  const finalTotal = totalBeforeTax + taxes;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <header className="px-10 py-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/50">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 hover:bg-white hover:border-blue-600 transition-all text-slate-500 hover:text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">New Booking – Room {room.roomNo}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Reservation & Guest Registration</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-lg border border-slate-300 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">Print Receipt</button>
          <button 
            onClick={() => onConfirm({})}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
          >
            Confirm Check-In
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-10 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* SECTION 1: ROOM INFORMATION */}
        <section>
          <div className="mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-slate-200"></span>
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Section 01: Room Information</h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Room No</label>
              <p className="text-xl font-black text-slate-900">{room.roomNo}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Category</label>
              <p className="text-lg font-black text-blue-600">{roomType?.name || '--'}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Floor</label>
              <p className="text-lg font-black text-slate-700">LEVEL {floor?.name || '--'}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 uppercase">
                {room.status}
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Capacity</label>
              <p className="text-lg font-black text-slate-700">2 ADULTS</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: GUEST INFORMATION */}
        <section>
          <div className="mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-slate-200"></span>
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Section 02: Guest Information</h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Guest Full Name</label>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter guest name"
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">ID Proof Type</label>
                <select 
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                >
                  <option>Passport</option>
                  <option>Aadhaar</option>
                  <option>Driving License</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">ID Number</label>
                <input 
                  type="text" 
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Enter ID number"
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nationality</label>
                <input 
                  type="text" 
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="Enter nationality"
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Residential Address</label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address"
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">City</label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CHECK-IN & STAY DETAILS */}
        <section>
          <div className="mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-slate-200"></span>
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Section 03: Check-in & Stay Details</h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Check-in Date</label>
                  <input 
                    type="date" 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Check-in Time</label>
                  <input 
                    type="time" 
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Check-out Date</label>
                  <input 
                    type="date" 
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Check-out Time</label>
                  <input 
                    type="time" 
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Quick Stay Duration</label>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3].map(d => (
                    <button 
                      key={d}
                      onClick={() => handleStayDuration(d)}
                      className={`py-3 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all ${
                        nights === d 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                  <button className="py-3 rounded-xl border border-slate-200 bg-white text-slate-600 text-[11px] font-black uppercase tracking-widest hover:border-slate-400 transition-all">
                    Custom
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Stay</span>
                <span className="text-2xl font-black text-blue-700">{nights} NIGHTS</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRICE SUMMARY */}
        <section className="pb-20">
          <div className="mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-slate-200"></span>
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Section 04: Price Summary Panel</h2>
            <span className="flex-1 h-px bg-slate-200"></span>
          </div>
          
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Room Price Per Night (₹)</label>
                    <input 
                      type="number" 
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-lg font-black outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>Stay Details ({nights} Night{nights > 1 ? 's' : ''})</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {[1, 2, 3].map(d => (
                      <div key={d} className={`flex justify-between text-[10px] font-bold ${nights === d ? 'text-blue-400' : 'text-slate-600'}`}>
                        <span>{d} Day{d > 1 ? 's' : ''}</span>
                        <span>₹{(pricePerNight * d).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Extra Bed Charges (₹)</label>
                    <input 
                      type="number" 
                      value={extraBedCharges}
                      onChange={(e) => setExtraBedCharges(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-lg font-black outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Discount (₹)</label>
                    <input 
                      type="number" 
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-lg font-black outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/5 rounded-3xl p-8 flex flex-col justify-between border border-white/10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm font-black">₹{totalBeforeTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Taxes (12%)</span>
                    <span className="text-sm font-black">₹{taxes.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-4"></div>
                </div>
                <div className="pt-6">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] block mb-2">Final Total Balance</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer Actions */}
      <footer className="px-10 py-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-4 shrink-0">
        <button 
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-slate-300 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all"
        >
          Cancel
        </button>
        <button className="px-8 py-3 rounded-xl border border-slate-300 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">
          Save Booking
        </button>
        <button 
          onClick={() => onConfirm({})}
          className="px-10 py-3 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
        >
          Confirm Check-In
        </button>
      </footer>
    </div>
  );
};

export default BookingPanel;
