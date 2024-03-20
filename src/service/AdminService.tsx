import axios from "axios";
import { HOST } from "../constant/Constant";

export class AdminService {

  async getAllUser(){
    const url = HOST + "/admin/getAllUser";
    const response = await axios.get(url);
    return response.data;
  }

  async getAllLandmark(){
    const url = HOST + "/admin/getAllLandmark";
    const response = await axios.get(url);
    return response.data;
  }
}