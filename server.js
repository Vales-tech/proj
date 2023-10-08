const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Abilita CORS
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/getChannelMetrics', async (req, res) => {
  const channelName = req.body.channelName;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=YOUR_API_KEY`
    );
    const data = response.data;

    const metrics = {
      channelTitle: data.items[0].snippet.title,
      subscribers: data.items[0].statistics.subscriberCount,
      views: data.items[0].statistics.viewCount,
      videos: data.items[0].statistics.videoCount,
    };

    res.json(metrics);
  } catch (error) {
    console.error("Si è verificato un errore durante la richiesta API:", error);
    res.status(500).json({ error: "Errore durante la richiesta API" });
  }
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
