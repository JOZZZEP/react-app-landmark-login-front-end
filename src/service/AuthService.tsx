import axios from "axios";
import { HOST } from "../constant/Constant";

export class AuthService {
  async login(user: any) {
    const body = {
      username: user.username,
      password: user.password,
    };
    const url = HOST + "/user/login";
    const response = await axios.post(url, body);
    const userRes = response.data;
    return userRes;
  }

  async register(user: any) {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("country", user.country);
    if (user.avatar) {
      formData.append("avatar", user.avatar);
    }

    const url = HOST + "/user/register";
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = response.data;
    return result;
  }

  async getUserByToken(token: string) {
    const body = {
      token: token,
    };
    const url = HOST + "/user/getUser";
    const response = await axios.post(url, body);
    return response.data;
  }
}
