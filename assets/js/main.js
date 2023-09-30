// Gestore dell'invio del modulo
document.getElementById("channelForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const channelName = document.getElementById("channelName").value;

  // Esegui una richiesta API con il nome utente del canale
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=YAIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc`)
    .then((response) => response.json())
    .then((data) => {
      // Estrai le metriche desiderate dalla risposta API
      const metrics = {
        channelTitle: data.items[0].snippet.title,
        subscribers: data.items[0].statistics.subscriberCount,
        views: data.items[0].statistics.viewCount,
        videos: data.items[0].statistics.videoCount,
      };

      // Ottieni l'elemento "metrics" dal DOM
      const metricsElement = document.getElementById("metrics");

      // Crea un canvas per il grafico
      const canvas = document.createElement("canvas");
      canvas.id = "lineChart"; // Assegna un id al canvas

      // Rimuovi il canvas esistente, se presente
      const existingCanvas = document.getElementById("lineChart");
      if (existingCanvas) {
        existingCanvas.remove();
      }

      // Aggiungi il canvas all'elemento "metrics"
      metricsElement.appendChild(canvas);

      // Ottieni il contesto del canvas
      const ctx = canvas.getContext("2d");

      // Definisci i dati per il grafico a linee
      const dataPoints = [
        { label: "Iscritti", value: metrics.subscribers },
        { label: "Visualizzazioni", value: metrics.views },
        { label: "Video", value: metrics.videos },
      ];

      // Estrai le etichette e i valori dai dati
      const labels = dataPoints.map((point) => point.label);
      const values = dataPoints.map((point) => point.value);

      // Crea il grafico a linee utilizzando Chart.js
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Metriche",
              data: values,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la richiesta API:", error);
    });
});
