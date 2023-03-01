import config from "../config/config";

export function fetchRequest(url, opts, jsonFormat) {
  return new Promise((resolve, reject) => {
    fetch(url, opts)
      .then((response) => {
        console.log(response);
        if (jsonFormat) {
          return response.json();
        } else {
          return response;
        }
      })
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
}

export const postToServer = async (data) => {
  let url = config.url.save;
  url += JSON.stringify(data);
  let opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let result = await saveResultValidation(await fetchRequest(url, opts, true));

  return result;
};

export const saveResultValidation = async (result) => {
  console.log("saveResultValidation");
  console.log(result);
  if (result.status == 0) {
    return true;
  } else {
    return false;
  }
};


