import apiClient from "./client";


const makeRequest = (payload) => {

    return apiClient.post('/requests', payload);

}
const updateRequest = (payload) => {

    return apiClient.post('/requests/approve', payload);

}

const deleteRequest = (requestId) => {

    return apiClient.delete(`/requests/${requestId}`);

}

const approveRequest = (payload) => {
    return apiClient.post('/', payload)
}

const getAllRequests = (payload) => {
    return apiClient.get('/requests?filter=true')
}


export { makeRequest, updateRequest, deleteRequest, approveRequest, getAllRequests }