const http = require('http');
const express = require('express');

const expressApp = express();
const server = http.createServer(expressApp);

//Premier Middleware qui a comme charge de logger dans la console une request envoyé par le client
expressApp.use((req, res, next) => {
    console.log("Requête reçue => " + req.url);
    next();
});

// second middleware qui est en charge d'envoyer une réponse au client.
expressApp.use((req, res, next) => {
    res.send('Hello World !');
    next();
});

// troisième middleware pour exécuter un log une fois la requếte terminée
expressApp.use((req, res) => {
    console.log("Requête terminée, réponse envoyé au client");
});

expressApp.set('port', process.env.PORT || 3000);
server.listen(process.env.PORT || 3000, () => console.log("Server started"));