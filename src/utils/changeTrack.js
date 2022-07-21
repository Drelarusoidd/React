function changeTrack(method, data, currentUrl) {
    let trackSet = JSON.parse(data)['track_set'];
    for (let i = 0; i < trackSet.length; i++) {
      const url = trackSet[i]['track']
      if (currentUrl === url) {
        var currentIndex = i;
        break;
      }
    }

    if (method === 'next') {
        if (currentIndex + 1 === trackSet.length) {
          const url = trackSet[0]['track'];
          const cover = trackSet[0]['cover'];
          const trackName = trackSet[0]['name'];
          return [url, cover, trackName]
        }else {
          const url = trackSet[currentIndex + 1]['track'];
          const cover = trackSet[currentIndex + 1]['cover'];
          const trackName = trackSet[currentIndex + 1]['name'];
          return [url, cover, trackName]
        }
    }else {
        if (currentIndex - 1 === -1) {
          const url = trackSet[trackSet.length - 1]['track']
          const cover = trackSet[trackSet.length - 1]['cover'];
          const trackName = trackSet[trackSet.length - 1]['name'];
          return [url, cover, trackName]
        }else {
          const url = trackSet[currentIndex - 1]['track'];
          const cover = trackSet[currentIndex - 1]['cover'];
          const trackName = trackSet[currentIndex - 1]['name'];
          return [url, cover, trackName]
        }
    }
}

export default changeTrack;
