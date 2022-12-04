import { create } from "apisauce";
const apiClient = create({
    baseURL: "http://192.168.218.204:3000/api"
});

export default apiClient;   
