function playlistMasher(tracks, numberOfTracks) {
    const sumFunction = (accumulator, currentItem) => {
        const index = accumulator.map(item => item.track.id).indexOf(currentItem.id);
        if (index > -1) {
            accumulator[index].count++;
        } else {
            accumulator.push({
                track: currentItem,
                count: 1
            })
        }

        return accumulator;
    }

    const compare = (a, b) => {
        if (a.count < b.count) {
            return 1;
        } else if (a.count > b.count) {
            return -1;
        }

        return 0;
    }

    const tracksWithCount = tracks.reduce(sumFunction, []);
    const orderedTracks = tracksWithCount.sort(compare);

    console.log(orderedTracks[0]);

    return orderedTracks.slice(0, numberOfTracks);
}

module.exports = playlistMasher;