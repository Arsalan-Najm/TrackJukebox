require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/client/dist'));

app.use('/api/genre', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/genre`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});

app.use('/api/data/:genreId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/genre/${req.params.genreId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/artist/:genreId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/genre/${req.params.genreId}/artists`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/tracks/:artistId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/artist/${req.params.artistId}/top?limit=12`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/chart', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/chart/132`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/artistdetail/:artistId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/artist/${req.params.artistId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/artisttracks/:artistId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/artist/${req.params.artistId}/top?limit=10`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/track/:trackId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/track/${req.params.trackId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/lyrics', async (req, res) => {
  const { artist, track } = req.query;
  try {
    const response = await axios.get(
      `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_artist=${artist}&q_track=${track}&apikey=4689b9c150675b574b4f1e44fd7becee`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/album/:albumId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.deezer.com/album/${req.params.albumId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('/api/search', async (req, res) => {
  const { search } = req.query;
  try {
    const response = await axios.get(`https://api.deezer.com/search?q=${search}&order=ARTIST_ASC&limit=15`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracks');
  }
});
app.use('*', (req, res) => {
  res.sendFile(process.cwd() + '/client/dist/index.html');
});
app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`RUNNING ON PORT ${process.env.PORT || 5001}`);
  }
});
