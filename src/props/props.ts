export interface TrackerListProps {
  trackerId: string;
  trackerData: {
    lastUpdated: string;
    trackerId: string;
    trackerName: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface TrackerLocation {
  latitude: number;
  longitude: number;
}

export interface UserListProps {
  userId: string;
  userData: {
    phoneNumber: string | null;
    userId: string;
    email: string;
    trackerId?: string;
    username: string;
    profilePictureUrl: string | null;
  };
}

export interface PackageListProps {
  orderNo: string;
  deliveryStatus: "On Delivery" | "Check-in" | "Check-out" | "Return";
  lastUpdateTime: string;
  totalWeight: number;
  checkOutTime: string;
  totalPrice: number;
  deliveryStartTime: string;
  orderNotes: string;
  itemsList: string[];
  checkInTime: string;
  customer: string;
  address: string;
  trackerId: string;
  driverId: string;
}
