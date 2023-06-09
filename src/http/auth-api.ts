import api from "./api";

export const csrfCookie = () => api.get("/sanctum/csrf-cookie");

export const login = (credentials: any) => api.post("/auth/login", credentials);

export const logout = () => api.post("/auth/logout");

export const register = (user: {}) => api.post("/auth/register", user);

export const getUser = () => api.get("/api/user");
