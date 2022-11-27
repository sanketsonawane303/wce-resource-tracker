import apiClient from "./client";

const getResource = (payload) => {
    return apiClient.get('/', payload);
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
