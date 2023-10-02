/*
	TXT by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// Gestore dell'invio del modulo
document.getElementById("channelForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const channelName = document.getElementById("channelName").value;

  // Esegui una richiesta API con il nome utente del canale
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=${channelName}&key=AIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc`)
    .then((response) => response.json())
    .then((data) => {
  // Estrai le metriche desiderate dalla risposta API
  const title = channelTitle: data.items[0].snippet.title,
    const subscrivers = subscribers: data.items[0].statistics.subscriberCount,
    const views = views: data.items[0].statistics.viewCount,
    const video = videos: data.items[0].statistics.videoCount,
  };
  
  // Visualizza le metriche nell'elemento div "metrics"
      const titleElement = document.getElementById("subscribers");
      titleElement.innerHTML = `<p>Numero di iscritti: ${metrics.subscribers}</p>`;
       const viewslement = document.getElementById("views");
      titleElement.innerHTML = `<p>Numero di visualizzazioni: ${metrics.views}</p>`;
        const videolement = document.getElementById("video");
      titleElement.innerHTML = `<p>Numero di video: ${metrics.videos}</p>`; 
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la richiesta API:", error);
    });
});
