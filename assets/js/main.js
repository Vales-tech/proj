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
      const metrics = {
        channelTitle: data.items[0].snippet.title,
        subscribers: data.items[0].statistics.subscriberCount,
        views: data.items[0].statistics.viewCount,
        videos: data.items[0].statistics.videoCount,
      };

      // Visualizza le metriche nell'elemento div "metrics"
      const metricsElement = document.getElementById("metrics");
      metricsElement.innerHTML = `
        <h2>Metriche per il canale ${metrics.channelTitle}</h2>
        <p>Numero di iscritti: ${metrics.subscribers}</p>
        <p>Numero di visualizzazioni: ${metrics.views}</p>
        <p>Numero di video: ${metrics.videos}</p>
      `;
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la richiesta API:", error);
    });
});


// API playlist 
        const API_KEY = "AIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc"; 
// Array di nomi utente dei canali desiderati
        const channelUsernames = ["Canale1", "Canale2", "Canale3"]; // Sostituisci con i nomi utente dei canali desiderati
        // Funzione per ottenere le playlist di un canale
        function getPlaylists(channelUsername) {
            const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelUsername=${channelUsername}&key=${AIzaSyAjvgjAILjhg4tL3e713tEm2AUr2k5d9Nc}`;

            return fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    return data.items;
                });
        }

        // Funzione per visualizzare le playlist in un elenco
        function displayPlaylists(playlists) {
            const playlistList = document.getElementById("playlistList");

            playlists.forEach(playlist => {
                const listItem = document.createElement("li");
                listItem.textContent = playlist.snippet.title;
                playlistList.appendChild(listItem);
            });
        }

        // Effettua richieste API per ciascun canale e visualizza le playlist
        Promise.all(channelUsernames.map(getPlaylists))
            .then(results => {
                const allPlaylists = [].concat(...results);
                displayPlaylists(allPlaylists);
            })
            .catch(error => {
                console.error("Si è verificato un errore durante le richieste API:", error);
            });
