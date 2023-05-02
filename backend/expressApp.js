const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");

const expressApp = express();
expressApp.use("/assets", express.static(__dirname + "/../public/build"));

const pages = new Map();
const loadFiles = async () => {
  const files = await fs.readdir(__dirname + "/../html/");
  files.map(async (file) => {
    const fileContents = await fs.readFile(
      path.resolve(__dirname + "/../html/" + file)
    );
    pages.set(path.basename(file), await fileContents);
    console.log(path.basename(file));
  });
};

loadFiles()
  .then(() => {
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
      res.send(pages.get("index.html"));
      next();
    });

    // quatrième middleware pour exécuter un log une fois la requête terminée
    expressApp.use((req, res) => {
      console.log("code response: " + res.statusCode);
      console.log("Requête terminée, réponse envoyé au client");
    });
  })
  .catch((err) => {
    console.error("Problème de chargement des fichiers du serveur: ", err);
    expressApp.use((req, res) => {
      res.status(500);
    });
    process.exit(1);
  });

module.exports = expressApp;
