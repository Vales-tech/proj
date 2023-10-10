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
        pass: 'tjlcdwtpiczzryiz'
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

    // Creare il corpo dell'email in un formato più leggibile
    const emailBody = `
        Nome: ${contatto.Name}
        Cognome: ${contatto.Surname}
        Email: ${contatto.Email}
        Canale: ${contatto.Canale}
        Telefono: ${contatto.Phone}
        Oggetto: ${contatto.subject}
        Messaggio: ${contatto.message}
    `;

    // Invia un'email con i dati del contatto
    const mailOptions = {
        from: 'valeunimi@gmail.com',
        to: 'valeunimi@gmail.com',
        subject: 'Nuovo contatto',
        text: emailBody
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


app.listen(port, () => console.log(`test contatti listening on port ${port}`));
