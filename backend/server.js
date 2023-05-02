const http = require('http');
const express = require('express');

const expressApp = express();
const server = http.createServer(expressApp);

//Premier Middleware qui a comme charge de logger dans la console une request envoyé par le client
expressApp.use((req, res) => {
    res.json({message: "Hello World !"});
    res.send('Hello World !');
    res.redirect('https://www.google.fr');
});

expressApp.set('port', process.env.PORT || 3000);
server.listen(process.env.PORT || 3000, () => console.log("Server started"));