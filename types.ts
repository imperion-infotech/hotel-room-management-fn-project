
export type RoomStatus = 'Available' | 'Occupied' | 'Dirty' | 'Clean' | 'Out of Order' | 'Under Maintenance';

export interface Floor {
  id: string;
  name: string;
}

export interface RoomType {
  id: string;
  name: string;
  defaultPrice: number;
}

export interface Room {
  id: string;
  roomNo: string;
  floorId: string;
  roomTypeId: string;
  isSmoking: boolean;
  isHandicap: boolean;
  isNonRoom: boolean;
  status: RoomStatus;
}

export interface GuestReservation {
  roomNo: string;
  roomType: string;
  guestName: string;
  phone: string;
  email: string;
  address: string;
  idType: string;
  idNumber: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  charges: number;
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  SETTINGS_MENU = 'SETTINGS_MENU',
  SETTINGS_FLOOR = 'SETTINGS_FLOOR',
  SETTINGS_ROOM_TYPE = 'SETTINGS_ROOM_TYPE',
  SETTINGS_ROOM = 'SETTINGS_ROOM',
  ROOM_DETAIL = 'ROOM_DETAIL',
  BOOKING = 'BOOKING'
}
