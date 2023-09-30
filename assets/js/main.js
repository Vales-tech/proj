// Gestore dell'invio del modulo
document.getElementById("channelForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const channelName = document.getElementById("channelName").value;

  // Esegui una richiesta API con il nome utente del canale
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=AIzaSyAjvgjAILjhg4tL3e713tEm2AUr1`)
    .then((response) => response.json())
    .then((apiData) => { // Rinominata la variabile apiData

      // Estrai le metriche desiderate dalla risposta API
      const metrics = {
        channelTitle: apiData.items[0].snippet.title,
        subscribers: apiData.items[0].statistics.subscriberCount,
        views: apiData.items[0].statistics.viewCount,
        videos: apiData.items[0].statistics.videoCount,
      };

      // Visualizza le metriche nell'elemento div "metrics"
      const metricsElement = document.getElementById("metrics");
      metricsElement.innerHTML = `
        <h2>Metriche per il canale ${metrics.channelTitle}</h2>
        <p>Numero di iscritti: ${metrics.subscribers}</p>
        <p>Numero di visualizzazioni: ${metrics.views}</p>
        <p>Numero di video: ${metrics.videos}</p>
      `;

      // Dati delle metriche per il grafico
      const chartData = {
        labels: ["Iscritti", "Visualizzazioni", "Video"],
        datasets: [
          {
            label: "Metriche",
            data: [metrics.subscribers, metrics.views, metrics.videos],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Colore per iscritti
              'rgba(54, 162, 235, 0.2)', // Colore per visualizzazioni
              'rgba(255, 206, 86, 0.2)', // Colore per video
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const ctx = document.getElementById("myChart").getContext("2d");

      // Crea il grafico a barre
      new Chart(ctx, {
        type: "bar",
        data: chartData, // Utilizzata la variabile chartData
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la richiesta API:", error);
    });
});
