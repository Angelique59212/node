const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs").promises;
const expressApp = express();

expressApp.use("/assets", express.static(__dirname + "/../assets"));

//Premier Middleware qui a comme charge de logger dans la console une request envoyé par le client
expressApp.use((req, res, next) => {
  console.log("Requête reçue => " + req.url);
  next();
});

// second middleware pour spécifier un code d'état par exemple
expressApp.use((req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200);
  next();
});

// troisième middleware qui est en charge d'envoyer une réponse au client
expressApp.use((req, res, next) => {
  async function getHtml() {
    const htmlContent = await fs.readFile(__dirname + "/../index.html");
    res.send(await htmlContent);
  }
  getHtml().then(() => next());
});

// quatrième middleware pour exécuter un log une fois la requête terminée
expressApp.use((req, res) => {
  console.log("code response: " + res.statusCode);
  console.log("Requête terminée, réponse envoyé au client");
});

module.exports = expressApp;
