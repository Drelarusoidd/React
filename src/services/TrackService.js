import httpClient from "./httpClient";

const TrackService = async(data) => {
    return httpClient.post('/track/', data)
        .then((response) => {
            return response.data
        })
}

export default TrackService;
