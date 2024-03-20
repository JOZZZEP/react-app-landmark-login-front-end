import axios from "axios";
import { HOST } from "../constant/Constant";

export class LandmarkService {
  async getLandmarkByCountry(country: string) {
    const body = {
      country: country,
    };
    const url = HOST + "/user/getLandmarkByCountry";
    const response = await axios.post(url, body);
    return response.data;
  }

  async getCountry() {
    const url = HOST + "/user/getCountry";
    const response = await axios.get(url);
    return response.data;
  }
}
