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
