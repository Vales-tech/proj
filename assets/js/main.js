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

  // Definisci i dati per il grafico a linee
  const dataPoints = [
    { label: "Iscritti", value: metrics.subscribers },
    { label: "Visualizzazioni", value: metrics.views },
    { label: "Video", value: metrics.videos },
  ];

  // Calcola il numero di punti dati
  const numPoints = dataPoints.length;

  // Calcola la larghezza di ogni intervallo orizzontale
  const intervalWidth = canvas.width / (numPoints + 1);

  // Definisci la posizione iniziale x
  let x = intervalWidth;

  // Disegna le linee del grafico
  ctx.strokeStyle = getRandomColor();
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x, canvas.height - (dataPoints[0].value / 1000000)); // Scala i dati
  for (let i = 1; i < numPoints; i++) {
    x += intervalWidth;
    ctx.lineTo(x, canvas.height - (dataPoints[i].value / 1000000)); // Scala i dati
  }

  ctx.stroke();

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
