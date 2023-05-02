const http = require('http');
const express = require('express');

const expressApp = express();
const server = http.createServer(expressApp);

expressApp.use((req, res) => {
    if (req.url === "/")
        res.send('Accès depuis la route /');
    else if (req.url === "/test")
        res.send('Accès depuis la route /test');
    else
        res.send("Une autre route a été spécifié");
});

expressApp.set('port', process.env.PORT || 3000);
server.listen(process.env.PORT || 3000, () => console.log("Server started"));