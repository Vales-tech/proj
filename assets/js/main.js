// Esegui una richiesta API con il nome utente del canale
 fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=AIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc`)  .then((response) => response.json())
  .then((data) => {
    // Estrai le metriche desiderate dalla risposta API
    const metrics = {
      channelTitle: data.items[0].snippet.title,
      subscribers: data.items[0].statistics.subscriberCount,
      views: data.items[0].statistics.viewCount,
      videos: data.items[0].statistics.videoCount,
    };

    // Visualizza le metriche nel grafico
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Subscribers', 'Views', 'Videos'],
        datasets: [{
          label: 'Channel Metrics',
          data: [metrics.subscribers, metrics.views, metrics.videos],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Colore per gli iscritti
            'rgba(54, 162, 235, 0.2)', // Colore per le visualizzazioni
            'rgba(255, 206, 86, 0.2)', // Colore per i video
          ],
          borderColor: [
            'rgba(255,99,132,1)', // Colore del bordo per gli iscritti
            'rgba(54, 162, 235, 1)', // Colore del bordo per le visualizzazioni
            'rgba(255, 206, 86, 1)', // Colore del bordo per i video
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error("Si è verificato un errore durante la richiesta API:", error);
  });
