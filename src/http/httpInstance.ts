import axios from "axios";

export const httpInstance = (baseUrl: string, headers: any[] = []) => {
  const API = axios.create({
    baseURL: baseUrl,
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
