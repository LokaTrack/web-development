import { TrackerApiResponse } from "../types/api";

// Mock API service for local development and testing
export const mockTrackerApi = {
  getTrackerLocation: async (trackerId: string): Promise<TrackerApiResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Dummy data for the specified tracker
    if (trackerId === 'lokatrack-gps-1') {
      return {
        status: "success",
        message: "Berhasil mendapatkan data lokasi tracker",
        data: {
          trackerId: "lokatrack-gps-1",
          trackerName: "GPS Tracker lokatrack-gps-1",
          location: {
            latitude: -6.372497167,  // 6.372497167° S
            longitude: 106.824141    // 106.824141° E
          },
          lastUpdate: "2025-04-28T03:22:57.979Z", // 10:22:57.979 AM UTC+7
          registrationDate: "2025-04-27T15:23:35.746Z", // 10:23:35.746 PM UTC+7
          userId: "baa3dfa6-202a-4ece-adf2-2a7824b076b9",
          username: "Budi Lokatrack",
          phoneNumber: "081129421485131"
        }
      };
    }
    
    // Return a not found response for other trackerIds
    return {
      status: "error",
      message: `Tracker dengan ID ${trackerId} tidak ditemukan`,
      data: null as any
    };
  }
};