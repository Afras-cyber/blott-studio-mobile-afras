import axios from "axios";
import { API_KEY } from "../constants/config";
import moment from "moment";
import { NewsTypes } from "@/types";

const baseURL = "https://finnhub.io/api/v1";

const newsApi = axios.create({
  baseURL,
  params: {
    token: API_KEY,
  },
});

export const fetchNews = async ({ category = "general", ...params }) => {
  try {
    const response = await newsApi.get("/news", {
      params: {
        category,
        params,
      },
    });
    const update_data = response?.data?.map(
      (item: {
        id:string
        image: string;
        source: string;
        datetime: number;
        headline: string;
        url: string;
      }) => {
        return {
        id: item.id,
          thumbnail: item.image,
          source: item.source,
          date: moment(item.datetime * 1000).format("DD MMM YYYY"),
          title: item.headline,
          url: item.url,
        };
      }
    );
    return update_data;
  } catch (error) {
    console.error("Error fetching market news:", error);
    throw error;
  }
};

export default {
  fetchNews,
};
