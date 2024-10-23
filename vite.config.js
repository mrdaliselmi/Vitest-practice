import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

export default defineConfig({
  plugins: [reactRefresh()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
    coverage: {
      reporter: ["text", "lcov", "html"],  // Add 'lcov' reporter
      reportsDirectory: './coverage',      // Ensure the coverage directory is set
    },
  },
  resolve: {
    alias: {
      // Add the following alias for Ant Design
      "@ant-design/icons/lib/dist$": path.resolve(
        __dirname,
        "./node_modules/@ant-design/icons/lib/dist"
      ),
    },
  },
});
