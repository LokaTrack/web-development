import { DashboardStats, Driver, Package, PackageStatus, Tracker, TrackingPoint } from "../types";

// Mock dashboard statistics
export const mockDashboardStats: DashboardStats = {
  deliveredPackages: 458,
  returnedPackages: 23,
  activeDrivers: 15,
  onDeliveryPackages: 34,
  checkinPackages: 12,
  completionRate: 92,
};

// Mock packages data
export const mockPackages: Package[] = [
  {
    id: 'PKT-001-2025',
    recipient: 'Sari Organik',
    address: 'Jl. Kebon Jeruk No. 15, Jakarta Barat',
    items: 'Bayam, Kangkung, Wortel (25kg)',
    totalAmount: 850000,
    scheduledDelivery: '2025-04-25T08:30:00',
    status: PackageStatus.ON_DELIVERY,
    driverId: 'DRV-001',
    driverName: 'Budi Santoso'
  },
  {
    id: 'PKT-002-2025',
    recipient: 'Resto Sehat',
    address: 'Jl. Sudirman Kav. 45, Jakarta Pusat',
    items: 'Tomat, Buncis, Selada Air (18kg)',
    totalAmount: 720000,
    scheduledDelivery: '2025-04-25T09:15:00',
    status: PackageStatus.CHECKIN,
    driverId: 'DRV-002',
    driverName: 'Ahmad Rizki'
  },
  {
    id: 'PKT-003-2025',
    recipient: 'Warung Sayur Makmur',
    address: 'Jl. Tebet Raya No. 10, Jakarta Selatan',
    items: 'Kol, Brokoli, Sawi (30kg)',
    totalAmount: 950000,
    scheduledDelivery: '2025-04-25T10:00:00',
    status: PackageStatus.CHECKOUT,
    driverId: 'DRV-003',
    driverName: 'Dewi Anggraini'
  },
  {
    id: 'PKT-004-2025',
    recipient: 'Hotel Nusantara',
    address: 'Jl. MH Thamrin No. 59, Jakarta Pusat',
    items: 'Kentang, Jagung, Lobak (22kg)',
    totalAmount: 1250000,
    scheduledDelivery: '2025-04-26T08:00:00',
    status: PackageStatus.RETURNED,
    driverId: 'DRV-001',
    driverName: 'Budi Santoso',
    notes: 'Recipient was not available at the scheduled time'
  },
  {
    id: 'PKT-005-2025',
    recipient: 'Dapur Mama',
    address: 'Jl. Gatot Subroto No. 72, Jakarta Selatan',
    items: 'Cabai, Bawang, Tomat (15kg)',
    totalAmount: 680000,
    scheduledDelivery: '2025-04-26T09:30:00',
    status: PackageStatus.ON_DELIVERY,
    driverId: 'DRV-004',
    driverName: 'Eko Prasetyo'
  },
  {
    id: 'PKT-006-2025',
    recipient: 'Restoran Padang Sederhana',
    address: 'Jl. Casablanca No. 88, Jakarta Selatan',
    items: 'Cabai, Tomat, Bawang (28kg)',
    totalAmount: 1120000,
    scheduledDelivery: '2025-04-26T10:15:00',
    status: PackageStatus.CHECKIN,
    driverId: 'DRV-003',
    driverName: 'Dewi Anggraini'
  }
];

// Mock drivers data
export const mockDrivers: Driver[] = [
  {
    id: 'DRV-001',
    name: 'Budi Santoso',
    phoneNumber: '08123456789',
    email: 'budi.santoso@example.com',
    registrationDate: '2024-01-15',
    deliveredCount: 187,
    returningCount: 8
  },
  {
    id: 'DRV-002',
    name: 'Ahmad Rizki',
    phoneNumber: '08234567890',
    email: 'ahmad.rizki@example.com',
    registrationDate: '2024-02-08',
    deliveredCount: 142,
    returningCount: 5
  },
  {
    id: 'DRV-003',
    name: 'Dewi Anggraini',
    phoneNumber: '08345678901',
    email: 'dewi.anggraini@example.com',
    registrationDate: '2024-01-22',
    deliveredCount: 156,
    returningCount: 7
  },
  {
    id: 'DRV-004',
    name: 'Eko Prasetyo',
    phoneNumber: '08456789012',
    email: 'eko.prasetyo@example.com',
    registrationDate: '2024-03-05',
    deliveredCount: 89,
    returningCount: 3
  }
];

// Mock trackers data
export const mockTrackers: Tracker[] = [
  {
    id: 'TRK-001',
    deviceId: 'DEV-12345',
    name: 'Tracker Alpha',
    status: 'active',
    assignedTo: {
      driverId: 'DRV-001',
      driverName: 'Budi Santoso'
    },
    lastPing: '2025-04-27T14:35:22',
    batteryLevel: 85
  },
  {
    id: 'TRK-002',
    deviceId: 'DEV-23456',
    name: 'Tracker Beta',
    status: 'active',
    assignedTo: {
      driverId: 'DRV-002',
      driverName: 'Ahmad Rizki'
    },
    lastPing: '2025-04-27T14:40:18',
    batteryLevel: 72
  },
  {
    id: 'TRK-003',
    deviceId: 'DEV-34567',
    name: 'Tracker Gamma',
    status: 'active',
    assignedTo: {
      driverId: 'DRV-003',
      driverName: 'Dewi Anggraini'
    },
    lastPing: '2025-04-27T14:38:45',
    batteryLevel: 64
  },
  {
    id: 'TRK-004',
    deviceId: 'DEV-45678',
    name: 'Tracker Delta',
    status: 'active',
    assignedTo: {
      driverId: 'DRV-004',
      driverName: 'Eko Prasetyo'
    },
    lastPing: '2025-04-27T14:25:10',
    batteryLevel: 45
  },
  {
    id: 'TRK-005',
    deviceId: 'DEV-56789',
    name: 'Tracker Epsilon',
    status: 'inactive',
    lastPing: '2025-04-25T09:12:35',
    batteryLevel: 18
  }
];

// Mock tracking points for a live map
export const mockTrackingPoints: { [key: string]: TrackingPoint[] } = {
  'TRK-001': [
    {
      lat: -6.190825,
      lng: 106.821810,
      timestamp: '2025-04-28T07:30:00',
      speed: 28,
      heading: 45,
      trackerId: 'TRK-001'
    },
    {
      lat: -6.192200,
      lng: 106.824000,
      timestamp: '2025-04-28T07:35:00',
      speed: 32,
      heading: 90,
      trackerId: 'TRK-001'
    },
    {
      lat: -6.192500,
      lng: 106.827500,
      timestamp: '2025-04-28T07:40:00',
      speed: 15,
      heading: 120,
      trackerId: 'TRK-001'
    }
  ],
  'TRK-002': [
    {
      lat: -6.230825,
      lng: 106.851810,
      timestamp: '2025-04-28T07:30:00',
      speed: 35,
      heading: 270,
      trackerId: 'TRK-002'
    },
    {
      lat: -6.232200,
      lng: 106.848000,
      timestamp: '2025-04-28T07:35:00',
      speed: 28,
      heading: 260,
      trackerId: 'TRK-002'
    },
    {
      lat: -6.232800,
      lng: 106.844500,
      timestamp: '2025-04-28T07:40:00',
      speed: 0,
      heading: 260,
      trackerId: 'TRK-002'
    }
  ]
};