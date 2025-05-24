import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";

/**
 * Hook to protect routes that require authentication
 * Automatically redirects to login if not authenticated
 */
export function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return isAuthenticated();
}

/**
 * Hook to redirect authenticated users away from login page
 */
export function useLoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
}
