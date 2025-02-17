import api from "@/axios/axios";
import { Alert } from "react-native"

export class AuthUseCase {
  async auth(email: string, password: string) {
    try {
      const data = await api.post("/auth", { email: email, password: password });
      return data.data;
    } catch (error: any) {
      throw error.response;
    }
  }
}
