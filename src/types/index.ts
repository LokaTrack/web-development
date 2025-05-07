export enum PackageStatus {
  ON_DELIVERY = 'onDelivery',
  CHECKIN = 'checkin',
  CHECKOUT = 'checkout',
  RETURNED = 'returned'
}

export interface Package {
  id: string;
  recipient: string;
  address: string;
  items: string;
  totalAmount: number;
  scheduledDelivery: string;
  status: PackageStatus;
  driverId: string;
  driverName: string;
  notes?: string;
}

export interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  registrationDate: string;
  deliveredCount: number;
  returningCount: number;
  profilePictureUrl?: string;
}

export interface Tracker {
  id: string;
  deviceId: string;
  name: string;
  status: 'active' | 'inactive';
  assignedTo?: {
    driverId: string;
    driverName: string;
  };
  lastPing?: string;
  batteryLevel: number;
}

export interface TrackingPoint {
  lat: number;
  lng: number;
  timestamp: string;
  speed: number;
  heading: number;
  trackerId: string;
}

export interface DashboardStats {
  deliveredPackages: number;
  returnedPackages: number;
  activeDrivers: number;
  onDeliveryPackages: number;
  checkinPackages: number;
  completionRate: number;
}