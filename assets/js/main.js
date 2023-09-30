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

      // Ottieni il contesto del canvas
      const canvas = document.getElementById("customChart");
      const ctx = canvas.getContext("2d");

      // Imposta le dimensioni del canvas
      canvas.width = 400;
      canvas.height = 300;

      // Definisci i dati per il grafico
      const dataPoints = [
        { label: "Iscritti", value: metrics.subscribers },
        { label: "Visualizzazioni", value: metrics.views },
        { label: "Video", value: metrics.videos },
      ];

      // Calcola la larghezza delle barre in base ai dati
      const barWidth = 80;
      const spacing = 40;
      let x = 50;

      // Disegna le barre del grafico
      dataPoints.forEach((point) => {
        const barHeight = (canvas.height - 50) * (point.value / 1000000); // Scalare per la visualizzazione

        // Disegna una barra
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        // Scrivi l'etichetta sotto la barra
        ctx.fillStyle = "#000";
        ctx.fillText(point.label, x, canvas.height - 10);

        // Sposta la posizione x per la prossima barra
        x += barWidth + spacing;
      });

      // Funzione per generare colori casuali
      function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la richiesta API:", error);
    });
});
