import axios from "axios";

// 建立 axios 實例
const request = axios.create({
  // post: https://api.mercury.com/v1/user/login
  // baseURL: "https://api.mercury.com/v1",
  // request.post("/user/login", { username, password })
  // baseURL: "https://dummyjson.com", // api URL
  baseURL: "https://api-frontend-interview-server.metcfire.com.tw",
  timeout: 10000,
  headers: {
    interviewerName: "Mia",
  },
});

// 添加請求攔截器
request.interceptors.request.use(
  (config) => {
    // 在發送請求之前認證 token
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 撈 token 塞進 header 裡
    }
    return config;
  },
  (error) => {
    // 處理請求錯誤
    return Promise.reject(error);
  },
);

export default request;
