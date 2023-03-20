import apiClient from "./client";


const makeRequest = (payload) => {

    return apiClient.post('/requests', payload);

}
const updateRequest = (payload) => {

    return apiClient.put('/requests/approve', payload);

}

const deleteRequest = (requestId) => {

    return apiClient.delete(`/requests/${requestId}`);

}

const approveRequest = (payload) => {
    return apiClient.post('/requests/approve', payload)
}

const getAllRequests = (payload) => {
    return apiClient.get('/requests', payload)
}


export { makeRequest, updateRequest, deleteRequest, approveRequest, getAllRequests }