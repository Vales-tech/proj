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

      // Creazione dei dati per il grafico
      const labels = ["Subscribers", "Views", "Videos"];
      const dataValues = [metrics.subscribers, metrics.views, metrics.videos];

      // Ottieni l'elemento canvas
      const canvas = document.getElementById("myChart");

      // Crea il grafico utilizzando Chart.js
      const ctx = canvas.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Metriche del canale",
              data: dataValues,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // Colore per Subscribers
                "rgba(54, 162, 235, 0.2)", // Colore per Views
                "rgba(255, 206, 86, 0.2)", // Colore per Videos
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
});
