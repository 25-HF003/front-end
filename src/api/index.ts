import { userAPI } from "./user";
import { authAPI } from "./auth";
import { deepfakeAPI } from "./deepfake";
import { watermarkAPI } from "./watermark";
import { noiseAPI } from "./noise"

export const api = {
  user: userAPI,
  auth: authAPI,
  deepfake: deepfakeAPI,
  watermark: watermarkAPI,
  noise: noiseAPI
};
