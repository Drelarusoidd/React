function changeTrack(method, data, currentUrl) {
    const trackSet = data['track_set'];
    const currentIndex = trackSet.findIndex(value => value['track'] === currentUrl);

    let targetIndex = 0;
    if (method === 'next') {
        if (currentIndex + 1 !== trackSet.length) {
          targetIndex = currentIndex + 1;
        }
    }else {
        if (currentIndex - 1 === -1) {
          targetIndex = trackSet.length - 1;
        }else {
          targetIndex = currentIndex - 1;
        }
    }
    
    const url = trackSet[targetIndex]['track'];
    const cover = trackSet[targetIndex]['cover'];
    const trackName = trackSet[targetIndex]['name'];
    return [url, cover, trackName];
}

export default changeTrack;
