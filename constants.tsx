
import React from 'react';
import { Room } from './types';

export const ICONS = {
  Smoking: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 12h3M18 8h3M18 16h3" /><path d="M3 22h13a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3" /><path d="M12 2v20" />
    </svg>
  ),
  Handicap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="4" r="2"/><path d="M10 19a4 4 0 1 0 8 0"/><path d="M9.5 8H15l-2 4.5H9l-2-4.5z"/><path d="M12 12.5V15"/>
    </svg>
  ),
  Settings: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Grid: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
    </svg>
  ),
  Floor: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  RoomType: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Inventory: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"/><path d="m3 16 2 2 6-6"/><path d="m3 8 18 0"/><path d="M21 16v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"/><path d="m3 16 18 0"/>
    </svg>
  ),
};

export const INITIAL_FLOORS = [
  { id: '1', name: '1' },
  { id: '2', name: '2' },
  { id: '3', name: '3' },
  { id: '4', name: '4' },
  { id: '5', name: '5' },
  { id: '6', name: '6' },
];

export const INITIAL_ROOM_TYPES = [
  { id: 'rt1', name: 'Standard', defaultPrice: 3500 },
  { id: 'rt2', name: 'Deluxe', defaultPrice: 5500 },
  { id: 'rt3', name: 'Suite', defaultPrice: 8500 },
];

export const INITIAL_ROOMS: Room[] = [
  // Floor 1
  { id: 'r101', roomNo: '101', floorId: '1', roomTypeId: 'rt1', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Available' },
  { id: 'r102', roomNo: '102', floorId: '1', roomTypeId: 'rt1', isSmoking: true, isHandicap: false, isNonRoom: false, status: 'Occupied' },
  { id: 'r103', roomNo: '103', floorId: '1', roomTypeId: 'rt2', isSmoking: false, isHandicap: true, isNonRoom: false, status: 'Dirty' },
  { id: 'r104', roomNo: '104', floorId: '1', roomTypeId: 'rt2', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Clean' },
  // Floor 2
  { id: 'r201', roomNo: '201', floorId: '2', roomTypeId: 'rt1', isSmoking: true, isHandicap: false, isNonRoom: false, status: 'Available' },
  { id: 'r202', roomNo: '202', floorId: '2', roomTypeId: 'rt1', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Occupied' },
  { id: 'r203', roomNo: '203', floorId: '2', roomTypeId: 'rt3', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Out of Order' },
  { id: 'r204', roomNo: '204', floorId: '2', roomTypeId: 'rt3', isSmoking: true, isHandicap: false, isNonRoom: false, status: 'Available' },
  // Floor 3
  { id: 'r301', roomNo: '301', floorId: '3', roomTypeId: 'rt1', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Under Maintenance' },
  { id: 'r302', roomNo: '302', floorId: '3', roomTypeId: 'rt1', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Available' },
  { id: 'r303', roomNo: '303', floorId: '3', roomTypeId: 'rt2', isSmoking: true, isHandicap: false, isNonRoom: false, status: 'Occupied' },
  { id: 'r304', roomNo: '304', floorId: '3', roomTypeId: 'rt2', isSmoking: false, isHandicap: true, isNonRoom: false, status: 'Dirty' },
  // Floor 4
  { id: 'r401', roomNo: '401', floorId: '4', roomTypeId: 'rt1', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Clean' },
  { id: 'r402', roomNo: '402', floorId: '4', roomTypeId: 'rt1', isSmoking: true, isHandicap: false, isNonRoom: false, status: 'Available' },
  { id: 'r403', roomNo: '403', floorId: '4', roomTypeId: 'rt3', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Occupied' },
  { id: 'r404', roomNo: '404', floorId: '4', roomTypeId: 'rt3', isSmoking: false, isHandicap: false, isNonRoom: false, status: 'Available' },
];
