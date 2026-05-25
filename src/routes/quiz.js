var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");


// get, primeiro eu busco os dados do quiz
router.get("/buscar/:idQuiz", function (req, res) {
    quizController.buscarQuiz(req, res);
});

// depois post, ao receber os resultados do front, direcionar para o controller 
// futuramente salvando no banco em models
router.post("/salvar-resultado", function (req, res) {
    quizController.salvarResultado(req, res);
});

module.exports = router;