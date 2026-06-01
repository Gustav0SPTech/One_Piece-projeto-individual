var express = require("express");
var router = express.Router();

var dashController = require('../controllers/dashController')

router.get("/buscar-resultados", function (req, res) {
    dashController.buscarResultados(req, res);
})