import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: "",
    cors: {
      origin: ["https://lokatrack.me", "http://localhost:8000"],
    },
  },
});
