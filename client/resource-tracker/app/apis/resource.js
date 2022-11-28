import apiClient from "./client";

const getResource = (payload) => {
    return apiClient.get('/resources', payload);
}

const createResource = (payload) => {
    return apiClient.post('/', payload);
}

const updateResource = (payload) => {
    return apiClient.post('/', payload);
}

const deleteResource = (payload) => {
    return apiClient.delete('/', payload)

}

export default { getResource, createResource, updateResource, deleteResource };
