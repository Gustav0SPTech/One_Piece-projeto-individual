var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashController");

// rota para a KPI 1
router.get("/perfil/:idUsuario", function (req, res) {
    dashboardController.buscarDadosPerfil(req, res);
});

// rota para a KPI 2
router.get("/recorde/:idUsuario", function (req, res) {
    dashboardController.buscarRecorde(req, res);
});

// rota para a KPI 3
router.get("/qtd-quizzes/:idUsuario", function (req, res) {
    dashboardController.buscarQtdQuizzes(req, res);
});

// rota para gráfico evolução
router.get("/evolucao/:idUsuario", function (req, res) {
    dashboardController.buscarEvolucaoPessoal(req, res);
});

// rota para ranking
router.get("/ranking", function (req, res) {
    dashboardController.buscarTopRanking(req, res);
});

module.exports = router;