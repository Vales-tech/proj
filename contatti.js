const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let contacts = [];

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// AGGIUNGI CONTATTO POST
app.post('/contatti', (req, res) => {
    const contatto = req.body;
    console.log(contatto);
    contacts.push(contatto);
    res.send('Contatto is added to the database');
});

// RITORNA LISTA CONTATTI
app.get('/contatti', (req, res) => {
    res.json(contacts);
});

app.listen(port, () => console.log(`test contatti listening on port ${port}`));
