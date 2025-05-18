export interface TrackersListProps {
  registrationDate: string;
  lastUpdated: string;
  trackerId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  trackerName: string;
}

export interface TrackerLocation {
  latitude: number;
  longitude: number;
}
