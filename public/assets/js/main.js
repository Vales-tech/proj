document.getElementById("channelForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const channelName = document.getElementById("channelName").value;

  try {
    const response = await fetch('/getChannelMetrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `channelName=${channelName}`,
    });

    if (response.ok) {
      const data = await response.json();
      // Usa i dati per visualizzare le metriche o aggiornare il grafico
      console.log(data);
    } else {
      console.error("Errore nella richiesta API");
    }
  } catch (error) {
    console.error("Errore durante la richiesta API:", error);
  }
});
