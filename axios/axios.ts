import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from "@/environment";
import { MemoryStorageCore } from "@/core/memory-storage.core";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.defaults.headers['api-key'] = environment.apiKey;
api.defaults.headers['Authorization'] = `Bearer ${MemoryStorageCore.instance?.token ?? ""}`;

export default api;
