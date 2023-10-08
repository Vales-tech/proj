const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve la cartella "public" contenente i file statici (CSS, immagini, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Gestisce la richiesta GET per la pagina left-sidebar.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'left-sidebar.html'));
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
