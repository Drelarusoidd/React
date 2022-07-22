function changeTrack(method, data, currentUrl) {
    const trackSet = data['track_set'];
    const currentIndex = trackSet.findIndex(value => value['track'] === currentUrl)

    if (method === 'next') {
        if (currentIndex + 1 === trackSet.length) {
          var url = trackSet[0]['track'];
          var cover = trackSet[0]['cover'];
          var trackName = trackSet[0]['name'];
        }else {
          var url = trackSet[currentIndex + 1]['track'];
          var cover = trackSet[currentIndex + 1]['cover'];
          var trackName = trackSet[currentIndex + 1]['name'];
        }
    }else {
        if (currentIndex - 1 === -1) {
          var url = trackSet[trackSet.length - 1]['track']
          var cover = trackSet[trackSet.length - 1]['cover'];
          var trackName = trackSet[trackSet.length - 1]['name'];
        }else {
          var url = trackSet[currentIndex - 1]['track'];
          var cover = trackSet[currentIndex - 1]['cover'];
          var trackName = trackSet[currentIndex - 1]['name'];
        }
    }
    return [url, cover, trackName];
}

export default changeTrack;
