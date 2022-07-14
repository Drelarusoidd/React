 import $ from "jquery";

  function getPlaylist(playlistPk, method, playerId, currentUrl) {

    $.ajax({
        url: `http://127.0.0.1:8000/api/v1/playlist/${playlistPk}/`,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var data = JSON.stringify(result);
            changeTrack(playerId, method, data, currentUrl);
        },
        error: function () {
            alert('something went wrong');
        }
    })
  }

  function updatePlayer(playerId, urlTrack, cover, trackName) {
    document.getElementById(`player-${playerId}`).src = urlTrack;
    document.getElementById(`seekObj-${playerId}`).setAttribute('value', '0');

    var coverTrack = document.getElementById(`cover-${playerId}`);
    if (cover === null){
      coverTrack.style.display = 'none';
    }else{
      coverTrack.style.display = 'block';
      coverTrack.style.backgroundImage=`url('${cover}')`;
    }
    $(`#play-btn-${playerId}`).removeClass("pause");
    $(`#play-btn-${playerId}`).addClass("button");
    document.getElementById(`track-name-${playerId}`).innerText = trackName;
  }

  function changeTrack(playerId, method, data, currentUrl) {
    let trackSet = JSON.parse(data)['track_set'];
    for (let i = 0; i < trackSet.length; i++) {
      const url = trackSet[i]['track']
      if (currentUrl === url) {
        var currentIndex = i;
        break;
      }
    }

    if (trackSet.length === 1){
      document.getElementById(`previous-${playerId}`).disabled = true;
      document.getElementById(`next-${playerId}`).disabled = true;
    }else {
      if (method === 'next') {
        if (currentIndex + 1 === trackSet.length) {
          const url = trackSet[0]['track'];
          const cover = trackSet[0]['cover'];
          const trackName = trackSet[0]['name'];
          updatePlayer(playerId, url, cover, trackName);
        }else {
          const url = trackSet[currentIndex + 1]['track'];
          const cover = trackSet[currentIndex + 1]['cover'];
          const trackName = trackSet[currentIndex + 1]['name'];
          updatePlayer(playerId, url, cover, trackName);
        }
      }else {
        if (currentIndex - 1 === -1) {
          const url = trackSet[trackSet.length - 1]['track']
          const cover = trackSet[trackSet.length - 1]['cover'];
          const trackName = trackSet[trackSet.length - 1]['name'];
          updatePlayer(playerId, url, cover, trackName);
        }else {
          const url = trackSet[currentIndex - 1]['track'];
          const cover = trackSet[currentIndex - 1]['cover'];
          const trackName = trackSet[currentIndex - 1]['name'];
          updatePlayer(playerId, url, cover, trackName);
        }
      }
    }
  }
  
  function initPlayers(num, indexesArray) {
  
    for (var i = 0; i < num; i++) {
      (function () {
        // Variables
        // ----------------------------------------------------------
        // audio embed object
        var playerContainer = document.getElementById(`player-container-${indexesArray[i]}`),
          player = document.getElementById(`player-${indexesArray[i]}`),
          isPlaying = false,
          playBtn = document.getElementById(`play-btn-${indexesArray[i]}`),
          volumeBtn = document.getElementById(`volume-btn-${indexesArray[i]}`),
          previousBtn = document.getElementById(`previous-${indexesArray[i]}`),
          nextBtn = document.getElementById(`next-${indexesArray[i]}`),
          playlistPk = document.getElementById(`playlist-pk-${indexesArray[i]}`).getAttribute('value'),
          volumeSlider = document.getElementById(`volume-slider-${indexesArray[i]}`),
          volumePercent = document.getElementById(`volume-percent-${indexesArray[i]}`);
  
        // Controls Listeners
        // ----------------------------------------------------------
        if (playBtn != null) {
          playBtn.addEventListener("click", function () {
            togglePlay();
          });   
        }

        player.volume = 1;
        previousBtn.addEventListener("click", function () {
            var playerId = previousBtn.getAttribute('value');
            var currentUrl = document.getElementById(`player-${playerId}`).getAttribute('src');
            getPlaylist(playlistPk, 'previous', playerId, currentUrl);
        });

        nextBtn.addEventListener("click", function (){
            var playerId = previousBtn.getAttribute('value');
            var currentUrl = document.getElementById(`player-${playerId}`).getAttribute('src');
            getPlaylist(playlistPk, 'next', playerId, currentUrl);
        });

        if (volumeBtn != null) {
          volumeBtn.addEventListener("click", function () {
            volumeMute();
          })
          volumeBtn.addEventListener("mouseenter", function () {
            volumeChange();
          })
        }
  
        // Controls & Sounds Methods
        // ----------------------------------------------------------
        function togglePlay() {
          if (player.paused === false) {
            player.pause();
            isPlaying = false;
            playBtn.classList.remove("pause");
            playBtn.classList.add("button");

          } else {
            player.play();
            playBtn.classList.remove("button");
            playBtn.classList.add("pause");
            isPlaying = true;
          }
        }

        function volumeMute() {
          if (player.volume === 0) {
            player.volume = 1;
            volumeBtn.classList.remove("mute");
            volumeBtn.classList.add("unmute");
            volumePercent.style.height = player.volume * 100 + '%';
          } else {
            player.volume = 0;
            volumeBtn.classList.remove("unmute");
            volumeBtn.classList.add("mute");
            volumePercent.style.height = player.volume * 100 + '%';
          }
        }

        // Change volume after cilck & resize slider
        // ----------------------------------------------------------
        function volumeChange() {
          volumeSlider.style.display = "block";
          volumeSlider.addEventListener("click", event => {
            const sliderHeight = window.getComputedStyle(volumeSlider).height;
            const newVolume = event.offsetY / parseInt(sliderHeight);
            player.volume = newVolume;
            volumePercent.style.height = newVolume * 100 + '%';
            if (player.volume > 0) {
              volumeBtn.classList.remove("mute");
              volumeBtn.classList.add("unmute");
            }
            volumeSlider.addEventListener("mouseleave", function () {
              volumeSlider.style.display = "none";
            })
          }, false)
        }
      })();
    }
  }

  setTimeout(
    window.onload = function () {
        var listPlayers = document.getElementsByClassName("audio-player");
        var indexesArray = []
        for (var i = 0; i < listPlayers.length; i++){
        indexesArray.push(listPlayers[i].getAttribute('name'));
        }
        initPlayers($("[id^=player-container-]").length, indexesArray);
    }
  , 1000)
