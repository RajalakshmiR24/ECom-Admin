import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ECom || window.location.origin,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  try {
    const response = await axios.post("/api/ngo/user/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
  } catch (error) {
    console.error("Could not refresh token:", error);
    alert("Your session has expired. Please sign in again.");

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("hash");

    window.location.href = "/ngo/user/signin";

    throw error;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
