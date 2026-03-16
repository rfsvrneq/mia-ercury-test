import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("accessToken"));
  const userEmail = ref<string>("");

  // 模擬登入流程
  const login = async (email: string, password: string) => {
    // 模擬 API 請求的延遲 (UX 加分：讓按鈕的 loading 動畫跑 0.5 秒)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 產生一組假的 Token 存起來，讓後續的 Router 守衛放行
    const mockToken = "metcfire-interview-mock-token";

    token.value = mockToken;
    userEmail.value = email;
    localStorage.setItem("accessToken", mockToken);
  };

  const logout = () => {
    token.value = null;
    userEmail.value = "";
    localStorage.removeItem("accessToken");
  };

  return { token, userEmail, login, logout };
});
