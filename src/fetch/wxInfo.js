import config from "../config/config";
import { fetchRequest } from "../fetch";

export const getUserinfo = async (code) => {
  let url = config.url.getuserinfo + code;
  let opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  let useinfo = await fetchRequest(url, opts, true);
  console.log(useinfo);
  return useinfo;
};
