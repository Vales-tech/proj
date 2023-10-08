document.getElementById("channelForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const channelName = document.getElementById("channelName").value;

  try {
    const response = await fetch('/getChannelMetrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Imposta il tipo di contenuto a 'application/x-www-form-urlencoded'
      },
      body: `channelName=${channelName}`,
    });

    if (response.ok) {
      const data = await response.json();
      // Usa i dati per creare il grafico
      createBarChart(data);
    } else {
      console.error("Errore nella richiesta API:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Errore durante la richiesta API:", error);
  }
});

function createBarChart(data) {
  // Seleziona l'elemento HTML in cui vuoi visualizzare il grafico
  const ctx = document.getElementById('myChart').getContext('2d');

  // Crea il grafico a barre
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Subscribers', 'Views', 'Videos'],
      datasets: [{
        label: 'Channel Metrics',
        data: [data.subscribers, data.views, data.videos],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
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
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
