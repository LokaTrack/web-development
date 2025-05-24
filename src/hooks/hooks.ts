import axios from "axios";
import {
  PackageListProps,
  TrackerListProps,
  UserListProps,
  UserLoginProps,
} from "../props/props";
import React from "react";
import { getAuthHeaders, removeToken } from "../utils/authUtils";

export async function fetchTrackerList(
  setTrackersList: React.Dispatch<React.SetStateAction<TrackerListProps[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  setError(null);
  setIsLoading(true);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const headers = getAuthHeaders();

    const response = await axios.get(`${apiUrl}/trackers`, {
      headers,
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

    // Check if it's an authentication error
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 || err.response?.status === 403)
    ) {
      removeToken();
      window.location.href = "/login";
      return;
    }

    setError(
      err instanceof Error ? err.message : "Failed to fetch trackers list",
    );

    setIsLoading(false);
  }
}

export async function fetchUserList(
  setUsersList: React.Dispatch<React.SetStateAction<UserListProps[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  setError(null);
  setIsLoading(true);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const headers = getAuthHeaders();

    const response = await axios.get(
      `${apiUrl}/admin/users?email_verified=true&limit=100&offset=0`,
      {
        headers,
      },
    );

    if (response.status === 200) {
      const data = response.data;
      if (data.status === "success" && data.data) {
        setUsersList(data.data.users);
      } else {
        throw new Error(data.message || "Failed to get users list");
      }
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
    setIsLoading(false);
  } catch (err) {
    console.error("Error fetching users list:", err);

    // Check if it's an authentication error
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 || err.response?.status === 403)
    ) {
      removeToken();
      window.location.href = "/login";
      return;
    }

    setError(err instanceof Error ? err.message : "Failed to fetch users list");

    setIsLoading(false);
  }
}

export async function fetchPackageList(
  setPackageList: React.Dispatch<React.SetStateAction<PackageListProps[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  setError(null);
  setIsLoading(true);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const headers = getAuthHeaders();

    const response = await axios.get(`${apiUrl}/delivery/all/delivery`, {
      headers,
    });

    if (response.status === 200) {
      const data = response.data;
      if (data.status === "success" && data.data) {
        setPackageList(data.data);
      } else {
        throw new Error(data.message || "Failed to get packages list");
      }
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }

    setIsLoading(false);
  } catch (err) {
    console.error("Error fetching packages list:", err);

    // Check if it's an authentication error
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 || err.response?.status === 403)
    ) {
      removeToken();
      window.location.href = "/login";
      return;
    }

    setError(
      err instanceof Error ? err.message : "Failed to fetch packages list",
    );

    setIsLoading(false);
  }
}

export async function sendUserTrackerAssignment(
  userId: string | null,
  trackerId: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  setError(null);
  setIsLoading(true);

  if (userId === null) {
    userId = "null";
  }

  console.log(`User ID: ${userId}`);
  console.log(`Tracker ID: ${trackerId}`);
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const headers = getAuthHeaders();

    const response = await axios.put(
      `${apiUrl}/admin/trackers/${trackerId}`,
      {
        userId,
      },
      {
        headers,
      },
    );

    if (response.status === 200) {
      const data = response.data;
      if (data.status === "success") {
        console.log("Tracker assigned successfully");
      } else {
        throw new Error(data.message || "Failed to assign tracker");
      }
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
    setIsLoading(false);
  } catch (err) {
    console.error("Error assigning tracker:", err);

    // Check if it's an authentication error
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 || err.response?.status === 403)
    ) {
      removeToken();
      window.location.href = "/login";
      return;
    }

    setError(err instanceof Error ? err.message : "Failed to assign tracker");

    setIsLoading(false);
  }
}

export async function sendLogin(
  email: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
): Promise<UserLoginProps | null> {
  setError(null);
  setIsLoading(true);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.post(
      `${apiUrl}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      const data = response.data;
      if (data.status === "success" && data.data) {
        setIsLoading(false);
        return data.data; // Return the login data
      } else {
        throw new Error(data.message || "Failed to login");
      }
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  } catch (err) {
    console.error("Error during login:", err);
    setError(err instanceof Error ? err.message : "Failed to login");
    setIsLoading(false);
    return null; // Return null on error
  }
}
