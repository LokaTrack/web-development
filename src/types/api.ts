export interface TrackerApiResponse {
  status: string;
  message: string;
  data: {
    trackerId: string;
    trackerName: string;
    location: {
      latitude: number;
      longitude: number;
    };
    lastUpdate: string;
    registrationDate: string;
    userId: string;
    username: string;
    phoneNumber: string;
  };
}