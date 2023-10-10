const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let contacts = [];

const nodemailer = require('nodemailer');

// Configura il trasportatore per l'invio di email
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'valeunimi@gmail.com',
        pass: 'thekillersn1'
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// AGGIUNGI CONTATTO POST
app.post('/contatti', (req, res) => {
    const contatto = req.body;
    console.log(contatto);
    contacts.push(contatto);

    // Invia un'email con i dati del contatto
    const mailOptions = {
        from: 'tua-email@gmail.com',
        to: 'valeunimi@gmail.com',
        subject: 'Nuovo contatto',
        text: JSON.stringify(contatto)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email inviata: ' + info.response);
        }
    });

    // Invia una risposta al client
    res.send('Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto possibile');
});

// RITORNA LISTA CONTATTI
app.get('/contatti', (req, res) => {
    res.json(contacts);
});

app.listen(port, () => console.log(`test contatti listening on port ${port}`));
