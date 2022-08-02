import httpClient from "./httpClient";


const PostService = async(data) => {

    return httpClient.post('/feed/', data)
        .then((response) => {
            return response.data
        })
}

export default PostService;
