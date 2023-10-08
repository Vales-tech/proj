const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware per analizzare i dati JSON delle richieste POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Percorso per servire la tua pagina HTML e JavaScript
app.use(express.static('public'));

// Gestisci la richiesta POST dal client
app.post('/getChannelMetrics', async (req, res) => {
  try {
    const channelName = req.body.channelName;
    const apiKey = 'AIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc';  

    // Esegui una richiesta API con il nome utente del canale
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=${AIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc}`);
    
    // Estrai le metriche desiderate dalla risposta API
    const data = response.data;
    const metrics = {
      channelTitle: data.items[0].snippet.title,
      subscribers: data.items[0].statistics.subscriberCount,
      views: data.items[0].statistics.viewCount,
      videos: data.items[0].statistics.videoCount,
    };

    // Invia le metriche come risposta JSON
    res.json(metrics);
  } catch (error) {
    console.error("Si è verificato un errore durante la richiesta API:", error);
    res.status(500).json({ error: "Errore durante la richiesta API" });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
