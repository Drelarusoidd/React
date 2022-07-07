import httpClient from "./httpClient";

export const updateToken = async() => {
    const refreshToken = localStorage.getItem('refresh')
    const refreshForm = new FormData()

    refreshForm.append('refresh', refreshToken)

    return httpClient.post('/token/refresh/', refreshForm)
        .then((response) => {
            return response.data.access
        })
}
