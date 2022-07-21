import React, { useRef, useEffect, useState } from "react";
import httpClient from "../services/httpClient.js";
import "../Player.css"
import getPlaylist from "../services/GetPlaylist.js";
import changeTrack from "../utils/changeTrack.js";
import calculateTotalValue from "../utils/calculateTotalValue.js";
import calculateCurrentValue from "../utils/calculateCurrentValue.js";

const Player = ({id}) => {
    const [track, setTrack] = useState({});
    const [user, setUser] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [endTime, setEndTime] = useState("");
    const [startTime, setStartTime] = useState("");
    const [nameTrack, setNameTrack] = useState(false)
    const audio = useRef(null);
    const volumeBtn = useRef(null);
    const volumePercent = useRef(null);
    const volumeSlider = useRef(null);
    const coverTrack = useRef(null);
    const progress = useRef(null);

    useEffect(() => {
        const getTracks = async () => {
            const trackRes = await httpClient.get(`/track/${id}`)
            setTrack(trackRes.data);
            const userData = await httpClient.get(`/profile/${trackRes.data.user}/`)
            setUser(userData.data);
        }
        getTracks();
    }, [])

    const handlePlayBtn = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audio.current.pause();
        }else{
            audio.current.play();
        }
    }

    const handleVolumeMute = () => {
        const muted = audio.current.volume === 0
        audio.current.volume = muted ? 1 : 0;
        setMute(!muted)
        volumePercent.current.style.height=audio.current.volume * 100 + '%';
    }

    const handleVolume = (event) => {
        console.log('this');
        const sliderHeight = window.getComputedStyle(volumeSlider.current).height;
        const newVolume = event.nativeEvent.offsetY / parseInt(sliderHeight);
        audio.current.volume = newVolume;
        volumePercent.current.style.height = newVolume * 100 + '%';
    }

    const handleProgress = (event) =>{
        const player = audio.current;
        const percent = event.nativeEvent.offsetX / event.currentTarget.offsetWidth;
        player.currentTime = percent * player.duration;
        progress.current.value = percent;
    }

    const handleNextBtn = async() => {
        const response = await getPlaylist(track.playlist);
        const [urlTrack, cover, trackName] = changeTrack('next', response, audio.current.src);
        handleUpdatePlayer(urlTrack, cover, trackName);
    }

    const handlePreviousBtn = async() => {
        const response = await getPlaylist(track.playlist);
        const [urlTrack, cover, trackName] = changeTrack('previous', response, audio.current.src);
        handleUpdatePlayer(urlTrack, cover, trackName);
    }

    const handleUpdatePlayer = (urlTrack, cover, trackName) => {
        audio.current.src = urlTrack
        if (cover === null) {
            coverTrack.current.style.display = 'none';
        }else{
            coverTrack.current.style.display = 'block';
            coverTrack.current.style.backgroundImage = `url('${cover}')`;
        }
        setIsPlaying(false);
        setNameTrack(trackName);
    }

    const initProgressBar = () => {
        const player = audio.current;
        const length = player.duration;
        const current_time = player.currentTime;
    
        const totalLength = calculateTotalValue(length);
        setEndTime(totalLength);
        const currentTime = calculateCurrentValue(current_time);
        setStartTime(currentTime);

        const progressbar = progress.current
        progressbar.value = current_time / length;
        if (player.currentTime === player.duration) {
            setIsPlaying(false);
        }
    }

    return (
        <>
            <div className="audio-player">
                <div id='play-btn' className={isPlaying ? 'pause' : 'button'} onClick={handlePlayBtn}></div>
                <div id='previous' className="previous" onClick={handlePreviousBtn}></div>
                <div id='next' className="next" name={track.playlist} onClick={handleNextBtn}></div>
                <div className="volume">
                <div id='volume-btn' className={mute ? 'mute' : 'unmute'} ref={volumeBtn} onClick={handleVolumeMute}></div>
                <div id='volume-slider' className="volume-slider" ref={volumeSlider} onClick={(event) => {handleVolume(event)}}>
                    <div id='volume-percent' className="volume-percent" ref={volumePercent}></div>
                </div>
                </div>
                <div className="audio-wrapper" id='player-container'>
                    <audio ref={audio} id='player' value={track.playlist} onTimeUpdate={initProgressBar} src={track.track}></audio>
                </div>
                <div className="player-controls scrubber">
                    <p style={{margin: '0'}}><span id='track-name'>{nameTrack ? nameTrack : track.name}</span> <small> by </small> {user.username} </p>
                    <span id="seekObjContainer">
                        <progress id='seekObj' value="0" max="1" ref={progress} onClick={(event) => {handleProgress(event)}}></progress>
                    </span>
                    <small className='start-time' style={{float: 'left', position: 'relative', left: '20px', top: '30px', fontSize: '12px'}}>{startTime}</small>
                    <small className='end-time'  style={{float: 'right', position: 'relative', right: '20px', top: '30px', fontSize: '12px'}}>{endTime}</small>
                </div>
                <div className="album-image" id='cover' style={{backgroundImage: `url(${track.cover})`}} ref={coverTrack}></div>
            </div>
        </>
    )
}

export default Player;
