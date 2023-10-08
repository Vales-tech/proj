document.getElementById("channelForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const channelName = document.getElementById("channelName").value;

  try {
    const response = await fetch('/getChannelMetrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Imposta il tipo di contenuto a JSON
      },
      body: JSON.stringify({ channelName }), // Invia i dati come oggetto JSON
    });

    if (response.ok) {
      const data = await response.json();
      // Usa i dati per creare il grafico
      createPolarAreaChart(data);
    } else {
      console.error("Errore nella richiesta API:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Errore durante la richiesta API:", error);
  }
});

function createPolarAreaChart(data) {
  // Seleziona l'elemento HTML in cui vuoi visualizzare il grafico
  const ctx = document.getElementById('myChart').getContext('2d');

  // Crea il grafico a polar area utilizzando Chart.js
  const myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Subscribers', 'Views', 'Videos'],
      datasets: [{
        label: 'Channel Metrics',
        data: [data.subscribers, data.views, data.videos],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }],
    },
    options: {
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  });
}
