import httpClient from "./httpClient";

const getPlaylist = (playlistPk) => {
    return httpClient.get(`playlist/${playlistPk}/`)
        .then((response) => {
            return JSON.stringify(response.data)
        })
}

export default getPlaylist;
