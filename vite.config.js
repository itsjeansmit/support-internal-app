import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/support-internal-app/",
  plugins: [react()],
});
