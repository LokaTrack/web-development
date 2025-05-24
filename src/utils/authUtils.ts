/**
 * Get token from localStorage
 * @returns string | null - token if exists, null otherwise
 */
export function getToken(): string | null {
  return localStorage.getItem("token");
}

/**
 * Remove token from localStorage
 */
export function removeToken(): void {
  localStorage.removeItem("token");
}

/**
 * Check if user is authenticated
 * @returns boolean - true if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

/**
 * Get authorization headers for API calls
 * @returns object - headers with Authorization token
 */
export function getAuthHeaders(): { [key: string]: string } {
  const token = getToken();
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    // Fallback to environment token if no user token exists
    const envToken = import.meta.env.VITE_ACCESS_TOKEN;
    if (envToken) {
      headers.Authorization = envToken;
    }
  }

  return headers;
}
