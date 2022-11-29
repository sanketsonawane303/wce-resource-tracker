import apiClient from "./client";


const makeRequest = (payload) => {

    return apiClient.post('/requests', payload);

}
const updateRequest = (payload) => {

    return apiClient.post('/', payload);

}

const deleteRequest = (payload) => {

    return apiClient.delete('/', payload);

}

const approveRequest = (payload) => {
    return apiClient.post('/', payload)
}

const getAllRequests = (payload) => {
    return apiClient.get('/requests', payload)
}


export { makeRequest, updateRequest, deleteRequest, approveRequest, getAllRequests }