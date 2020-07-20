import axios from "axios";

export const getBaseURL = (baseUrl?: string): string => {
  if (baseUrl !== undefined && baseUrl !== "") return baseUrl;
  if (window["_env_"] !== undefined) return window["_env_"].API_BASE_URI;
  return "";
};

export const httpInstance = (baseUrl: string, headers: any[] = []) => {
  const API = axios.create({
    baseURL: getBaseURL(baseUrl),
    headers: headers,
  });

  return {
    get: (path?: string): Promise<object> => {
      return new Promise((resolve, reject) => {
        API.get(path)
          .then((data) => {
            data.status < 400 ? resolve(data) : reject(data);
          })
          .catch((error) => reject(error));
      });
    },
    post: (path: string, data: object): Promise<object> => {
      return new Promise((resolve, reject) => {
        API.post(path, data)
          .then((data) => {
            data.status < 400 ? resolve(data) : reject(data);
          })
          .catch((error) => reject(error));
      });
    },
    put: (path: string, data: object): Promise<object> => {
      return new Promise((resolve, reject) => {
        API.put(path, data)
          .then((data) => {
            data.status < 400 ? resolve(data) : reject(data);
          })
          .catch((error) => reject(error));
      });
    },
    delete: (path: string, id: string): Promise<object> => {
      return new Promise((resolve, reject) => {
        API.delete(`${path}/${id}`)
          .then((data) => {
            data.status < 400 ? resolve(data) : reject(data);
          })
          .catch((error) => reject(error));
      });
    },
  };
};

export default httpInstance;
