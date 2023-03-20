import apiClient from "./client";

const getResource = (payload) => {
    return apiClient.get('/resources', payload);
}

const createResource = (payload) => {
    return apiClient.post('/resources', payload);
}

const updateResource = (payload) => {
    return apiClient.post('/', payload);
}

const deleteResource = (payload) => {
    return apiClient.delete('/', payload)

}



export { getResource, createResource, updateResource, deleteResource };
