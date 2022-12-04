import apiClient from "./client";


const makeRequest = (payload) => {

    return apiClient.post('/requests', payload);

}
const updateRequest = (payload) => {

    return apiClient.post('/requests/approve', payload);

}

const deleteRequest = (requestId) => {

<<<<<<< HEAD
    return apiClient.delete(`requests/${requestId}`);
=======
    return apiClient.delete(`/requests/${requestId}`);
>>>>>>> 6ba7b17513a590e4ab8a7f8c72a0c331edea60cc

}

const approveRequest = (payload) => {
    return apiClient.post('/', payload)
}

const getAllRequests = (payload) => {
    return apiClient.get('/requests?filter=true')
}


export { makeRequest, updateRequest, deleteRequest, approveRequest, getAllRequests }