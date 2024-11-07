const express = require('express');
const app = express();
const animalRoute = require('./routes/animal-route');

// Middleware para processar o corpo das requisições em JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use a rota dos animais
app.use('/animais', animalRoute);

module.exports = app;