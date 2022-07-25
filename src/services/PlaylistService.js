import httpClient from "./httpClient";

const PlaylistService = async(data) => {

    return httpClient.post(`/playlist/`, data)
        .then((response) =>{
            return response.data
        })
}

export default PlaylistService;
