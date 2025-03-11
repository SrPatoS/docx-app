import { IUser } from "@/app/interfaces/user.interface";
import api from "@/axios/axios";

export class FindUserUseCase {
  async handle(): Promise<IUser> {
    try {
      const response = await api.get('/user')
      return response.data.data as IUser
    } catch (error: any) {
      throw error.response;
    }
  }
}