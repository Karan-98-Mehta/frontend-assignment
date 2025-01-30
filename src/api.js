import axios from "axios";
import { API_URL } from "./constants";

export const fetchProjectsData = async () => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    } catch(err) {
        console.log(err);
        throw new Error(err);
    }
};