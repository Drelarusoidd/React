import React, { useEffect, useState } from "react";
import httpClient from "../services/httpClient";
import {useParams} from "react-router-dom";

const ShowTracks = () => {
    const params = useParams()
    const pk = params.pk
    const [tracks, setTrack] = useState("")
    
    useEffect (() => {
        const getTrack = async() => {
            await httpClient.get(`/track/${pk}/`)
                .then((response) => {
                    setTrack(response.data);
                })
        }
        getTrack();
    }, [])

    return (
        <div>
            <h2>{JSON.stringify(tracks)}</h2>
        </div>
    )
}

export default ShowTracks;