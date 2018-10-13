const express = require('express')
const app = express()
const port = process.env.PORT || 3001

var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: '0fe0e1bcd123469aaf69836f818b40ef',
  clientSecret: '1635a4c691594bc3917441fae72d6548',
  redirectUri: 'http://spotify-playlist-masher.herokuapp.com/callback'
});

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "*")

  next();
}

app.use(allowCrossDomain);

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/playlists', (req, res) => {
  let access_token = req.query.access_token;

  spotifyApi.setAccessToken(access_token);

  // Querying the user
  spotifyApi.getMe()
    .then(function (data) {
      console.log('Now connected: ', data.body.display_name);
      spotifyApi.getUserPlaylists(data.body.id)
        .then((playlist_data) => {
          let playlists = playlist_data.body
            .items.map((playlist) => {
              return '' + playlist.name + ' (number of tracks: ' + playlist.tracks.total + ')';
            });
          res.send(playlists);
        }, (err) => {
          console.log('Error while trying to get the playlists from user: ' + data.body.id, err);
        });
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))