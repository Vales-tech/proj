const express = require('express');

let fetch;
if (typeof window === 'undefined') {
  // Se il codice viene eseguito lato server (Node.js), utilizza l'importazione dinamica
  fetch = require('node-fetch');
} else {
  // Se il codice viene eseguito lato client (browser), utilizza fetch nativo del browser
  fetch = window.fetch;
}

const app = express();
const port = 3000;

app.use(express.static('public')); // Serve il contenuto HTML, CSS e JavaScript dalla cartella 'public'

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Invia il file HTML principale
});

app.post('/getChannelMetrics', async (req, res) => {
  const channelName = req.body.channelName;

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=YOUR_API_KEY`);
    const data = await response.json();
    
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
