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
        type: "polarArea", // Imposta il tipo a "polarArea"
        data: {
          labels: ["Subscribers", "Views", "Videos"],
          datasets: [
            {
              label: "Metriche del canale",
              data: dataValues,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
              ],
            },
          ],
        },
        options: {
          scale: {
            ticks: {
              beginAtZero: true,
              suggestedMin: 100000000, // Imposta il valore minimo
              suggestedMax: 100000000000, // Imposta il valore massimo
              stepSize: 10000000, // Imposta l'incremento delle etichette sull'asse
            },
          },
        },
      });    
    });
});
