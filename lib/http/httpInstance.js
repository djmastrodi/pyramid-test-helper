"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpInstance = void 0;
const axios_1 = __importDefault(require("axios"));
exports.httpInstance = (baseUrl, headers = []) => {
    const API = axios_1.default.create({
        baseURL: baseUrl,
        headers: headers,
    });
    return {
        get: (path) => {
            return new Promise((resolve, reject) => {
                API.get(path)
                    .then((data) => {
                    data.status < 400 ? resolve(data) : reject(data);
                })
                    .catch((error) => reject(error));
            });
        },
        post: (path, data) => {
            return new Promise((resolve, reject) => {
                API.post(path, data)
                    .then((data) => {
                    data.status < 400 ? resolve(data) : reject(data);
                })
                    .catch((error) => reject(error));
            });
        },
        put: (path, data) => {
            return new Promise((resolve, reject) => {
                API.put(path, data)
                    .then((data) => {
                    data.status < 400 ? resolve(data) : reject(data);
                })
                    .catch((error) => reject(error));
            });
        },
        delete: (path, id) => {
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
exports.default = exports.httpInstance;
//# sourceMappingURL=httpInstance.js.map