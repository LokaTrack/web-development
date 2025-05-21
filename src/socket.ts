import { io, Socket } from "socket.io-client";
import { TrackerLocation } from "./props/props";

// Define the server URL - replace with your actual socket server URL
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

let socket: Socket | null = null;

// Event callback types
type LocationUpdateCallback = (
  trackerId: string,
  location: TrackerLocation,
) => void;

/**
 * Connect to the socket server and set up event listeners
 * @param onLocationUpdate Callback function when a tracker's location is updated
 * @returns The socket instance
 */
export const connectSocket = (
  onLocationUpdate: LocationUpdateCallback,
): Socket => {
  // If socket exists and is connected, return it
  if (socket && socket.connected) {
    return socket;
  }

  // Create new socket connection
  socket = io(SOCKET_SERVER_URL);

  // Set up connection events
  socket.on("connect", () => {
    console.log("Connected to location tracking server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from location tracking server");
  });

  // Set up location update listener
  socket.on(
    "tracker:location_update",
    (data: { trackerId: string; location: TrackerLocation }) => {
      console.log(
        `Location update for tracker ${data.trackerId}:`,
        data.location,
      );
      onLocationUpdate(data.trackerId, data.location);
    },
  );

  return socket;
};

/**
 * Disconnect from the socket server
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Subscribe to updates for a specific tracker
 * @param trackerId The ID of the tracker to subscribe to
 */
export const subscribeToTracker = (trackerId: string): void => {
  if (socket && socket.connected) {
    socket.emit("subscribe", { trackerId });
  }
};

/**
 * Unsubscribe from updates for a specific tracker
 * @param trackerId The ID of the tracker to unsubscribe from
 */
export const unsubscribeFromTracker = (trackerId: string): void => {
  if (socket && socket.connected) {
    socket.emit("unsubscribe", { trackerId });
  }
};
