let SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi({
    clientId: '0fe0e1bcd123469aaf69836f818b40ef',
    clientSecret: '1635a4c691594bc3917441fae72d6548',
    redirectUri: 'http://spotify-playlist-masher.herokuapp.com/callback'
});

function setAccessToken(token) {
    spotifyApi.setAccessToken(token);
}

function getPlaylistsForUser(callbacks) {
    spotifyApi.getMe()
        .then(function (data) {
            console.log('Now connected: ', data.body.display_name);
            spotifyApi.getUserPlaylists(data.body.id)
                .then((playlist_data) => callbacks.onSuccess({
                    playlists: playlist_data.body.items,
                    owner_id: data.body.id
                }),
                    (err) => callbacks.onError(err));
        }, (err) => callbacks.onError(err));
}

function getPlaylistById(playlistSpotifyId, callbacks) {
    spotifyApi.getPlaylist(playlistSpotifyId)
        .then((data) => callbacks.onSuccess(data.body), (err) => callbacks.onError(err));
}

module.exports = {
    setAccessToken: setAccessToken,
    getPlaylistsForUser: getPlaylistsForUser,
    getPlaylistById: getPlaylistById
}