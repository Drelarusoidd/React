import httpClient from './httpClient';

export const signIn = async(username, password) => {
    const formField = new FormData()

    formField.append('username', username)
    formField.append('password', password)

    return httpClient.post('/sign-in/', formField)
        .then((response) => {
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            return response.data
        })
}
