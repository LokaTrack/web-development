import axios from "axios";
import { TrackersListProps } from "../props/trackers";

export async function fetchTrackersList(
  setTrackersList: React.Dispatch<React.SetStateAction<TrackersListProps[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  setError(null);
  setIsLoading(true);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

    const response = await axios.get(`${apiUrl}/trackers`, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = response.data;
      if (data.status === "success" && data.data) {
        setTrackersList(data.data);
      } else {
        throw new Error(data.message || "Failed to get trackers list");
      }
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }

    setIsLoading(false);
  } catch (err) {
    console.error("Error fetching trackers list:", err);
    setError(
      err instanceof Error ? err.message : "Failed to fetch trackers list",
    );
  }
}
