import { create } from "apisauce";
const apiClient = create({
    baseURL: "http://192.168.140.204:3000/api"
});

export default apiClient;
