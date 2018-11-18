const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

var spotifyApiWrapper = require('./spotifyApiWrapperFacade');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "*");

    next();
}

app.use(allowCrossDomain);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/playlists', (req, res) => {
    let access_token = req.query.access_token;
    spotifyApiWrapper.setAccessToken(access_token);
    spotifyApiWrapper.getPlaylistsForUser({
        onSuccess: (data) => {
            res.send({
                playlists: data.playlists,
                owner_id: data.owner_id,
                error: undefined
            });
        },
        onError: (err) => {
            console.log('Error while trying to get the playlists from user, Details:\n', err);
            res.send({
                playlists: undefined,
                owner_id: undefined,
                error: err
            });
        }
    });
});

app.get('/findPlaylist', (req, res) => {
    let playlistId = req.query.playlistId;
    spotifyApiWrapper.getPlaylistById(playlistId, {
        onSuccess: (playlist) => {
            res.send({
                playlist: playlist,
                isValid: true,
                error: undefined
            });
        },
        onError: (err) => {
            console.log('Error while trying to get playlist with id: ' + playlistId + '\nDetails:\n' + err);
            res.send({
                playlist: undefined,
                isValid: false,
                error: err
            });
        }
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));