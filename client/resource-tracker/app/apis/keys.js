import apiClient from "./client"

const uploadImages = (payload) => {
    return apiClient.post('/upload/id', payload)
}

const updateKeyStatus = (payload) => {
    return apiClient.put('/keys/status', payload)
}

export { updateKeyStatus, uploadImages }