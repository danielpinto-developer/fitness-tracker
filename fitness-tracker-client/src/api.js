import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const registerUser = (userData) => api.post("/register", userData);
export const loginUser = (userData) => api.post("/login", userData);
export const addActivity = (activityData) =>
  api.post("/add-activity", activityData);
export const getActivities = (userId) =>
  api.get(`/activities?user_id=${userId}`);

export default api;
