import { create } from "apisauce";

const apiClient = create({
    baseURL: "https://resource-tracker.onrender.com/api"
});

export default apiClient;   
