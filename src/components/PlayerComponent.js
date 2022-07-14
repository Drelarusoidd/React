import React, { useEffect, useState } from "react";
import httpClient from "../services/httpClient.js";
import "../App.js"
import "../player.js"
import $ from "jquery";

const Player = ({trackUrl, index, cover, id}) => {
    const [track, setTrack] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        const getTracks = async () => {
            httpClient.get(`/track/${id}`)
                .then((response) => {
                    setTrack(response.data);
                        httpClient.get(`/profile/${response.data.user}/`)
                            .then((response) => {
                                setUser(response.data);
                            })
                })
        }
        getTracks();
    }, [])

    function calculateTotalValue(length) {
        var minutes = Math.floor(length / 60),
            seconds_int = length - minutes * 60,
            seconds_str = seconds_int.toString(),
            seconds = seconds_str.substr(0, 2),
            time = minutes + ":" + seconds;
        return time;
    }
      
    function calculateCurrentValue(currentTime) {
        var current_hour = parseInt(currentTime / 3600) % 24,
            current_minute = parseInt(currentTime / 60) % 60,
            current_seconds_long = currentTime % 60,
            current_seconds = current_seconds_long.toFixed(),
            current_time =
                (current_minute < 10 ? "0" + current_minute : current_minute) +
                ":" +
                (current_seconds < 10 ? "0" + current_seconds : current_seconds);
      
        return current_time;
    }

    const initProgressBar = (num) => {
        var player = document.getElementById(`player-${num.index}`);
        var length = player.duration;
        var current_time = player.currentTime;
    
        var totalLength = calculateTotalValue(length);
        $(`.end-time-${num.index}`).html(totalLength);
    
        var currentTime = calculateCurrentValue(current_time);
        $(`.start-time-${num.index}`).html(currentTime);

        var progressbar = document.getElementById(`seekObj-${num.index}`);
        progressbar.value = player.currentTime / player.duration;
        progressbar.addEventListener("click", seek);
    
        var currentTime = calculateCurrentValue(current_time);
        if (player.currentTime === player.duration) {
            $(`#play-btn-${num.index}`).removeClass("pause");
            $(`#play-btn-${num.index}`).addClass("button");
        }
    
        function seek(evt) {
            var percent = evt.offsetX / this.offsetWidth;
            player.currentTime = percent * player.duration;
            progressbar.value = percent;
        }
    }

    return (
        <>
            <div id={`playlist-pk-${index}`} style={{display: 'none'}} value={track.playlist}></div> 
                <div className="audio-player" name={index}>
                <div id={`play-btn-${index}`} className="button" value={index}></div>
                <div id={`previous-${index}`} className="previous" value={index}></div>
                <div id={`next-${index}`} className="next" value={index}></div>
                <div id={`volume-btn-${index}`} className="unmute"></div>
                <div id={`volume-slider-${index}`} className="volume-slider">
                    <div id={`volume-percent-${index}`} className="volume-percent"></div>
                </div>
                <div className="audio-wrapper" id={`player-container-${index}`}>
                    <audio id={`player-${index}`} onTimeUpdate={() => setTimeout(initProgressBar, 500, {index})} src={track.track}></audio>
                </div>
                <div className="player-controls scrubber">
                    <p style={{margin: '0'}}><span id={`track-name-${index}`}>{track.name}</span> <small> by </small> {user.username} </p>
                    <span id="seekObjContainer">
                        <progress id={`seekObj-${index}`} value="0" max="1"></progress>
                    </span>
                    <small className={`start-time-${index}`} style={{float: 'left', position: 'relative', left: '20px', top: '30px', fontSize: '12px'}}></small>
                    <small className={`end-time-${index}`} style={{float: 'right', position: 'relative', right: '20px', top: '30px', fontSize: '12px'}}></small>
                </div>
                <div className="album-image"  id={`cover-${index}`} style={{backgroundImage: `url(${track.cover})`}}></div>
            </div>
        </>
    )
}

export default Player;
