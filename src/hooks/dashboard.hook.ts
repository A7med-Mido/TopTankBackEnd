import axios from "axios";
import env from "../configs/env.config";
import { CloudFetchHook } from "../types/hooks.types";



export const cloudFetchHook = async ({ path, ip, body, action }: CloudFetchHook) => {
  try {
    if(action === "get") {
      const { data } = await axios.get(`https://${ip}/cloud${path}`,{
        headers: {
          Authorization: env.APP_KEY
        }
      });
      return data;
    };
    if(action === "post") {
      const { data } = await axios.post(`https://${ip}/cloud${path}`,
        body,
        {
          headers: {
            Authorization: env.APP_KEY
          },
        }
      );
      return data;
    };
  } catch (error) {
    throw error;
  };
};