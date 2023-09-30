// Gestore dell'invio del modulo
document.getElementById("channelForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const channelName = document.getElementById("channelName").value;

  // Esegui una richiesta API con il nome utente del canale
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=AIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc`)
    .then((response) => response.json())
    .then((data) => {
  // Estrai le metriche desiderate dalla risposta API
  const metrics = {
    channelTitle: data.items[0].snippet.title,
    subscribers: data.items[0].statistics.subscriberCount,
    views: data.items[0].statistics.viewCount,
    videos: data.items[0].statistics.videoCount,
  };
  
  // Visualizza le metriche nell'elemento div "metrics"
      const metricsElement = document.getElementById("metrics");
      metricsElement.innerHTML = `
        <h2>Metriche per il canale ${metrics.channelTitle}</h2>
        <p>Numero di iscritti: ${metrics.subscribers}</p>
        <p>Numero di visualizzazioni: ${metrics.views}</p>
        <p>Numero di video: ${metrics.videos}</p>
      `;
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la richiesta API:", error);
    });
});
