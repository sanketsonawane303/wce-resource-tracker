import apiClient from "./client"

const uploadImages = (payload) => {
    return apiClient.post('/upload/id', payload)
}

const updateKeyStatus = (payload) => {
    return apiClient.put('/keys/status', payload)
}

const getKeyById = (payload) => {
    return apiClient.get('/keys', payload)
}

export { updateKeyStatus, uploadImages, getKeyById }