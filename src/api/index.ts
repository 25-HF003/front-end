import { userAPI } from "./user";
import { authAPI } from "./auth";
import { deepfakeAPI } from "./deepfake";

export const api = {
  user: userAPI,
  auth: authAPI,
  deepfake: deepfakeAPI,
};
