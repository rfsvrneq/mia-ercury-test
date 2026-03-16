import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler", // 這行是消除警告的關鍵
      },
      scss: {
        api: "modern-compiler", // 如果你有用到 scss 也順便加上
      },
    },
  },
});
