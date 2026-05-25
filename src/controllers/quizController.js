var quizModel = require("../models/quizModel");


// fazendo as validações ao buscar o quiz, gerenciando o envio das informações
function buscarQuiz(req, res) {
    var idQuiz = req.params.idQuiz;

    // validações
    if (idQuiz == undefined) {
        res.status(400).send("O ID do Quiz está indefinido!");
    } else {
        quizModel.buscarQuiz(idQuiz)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function salvarResultado(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idQuiz = req.body.idQuizServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;

// nenhum segredo, variáveis que recuperam valores do html
// depois validação

    if (!idUsuario || !idQuiz || acertos === undefined || erros === undefined) {
        res.status(400).send("Dados incompletos para salvar o resultado!");
    } else {
        quizModel.salvarResultado(idUsuario, idQuiz, acertos, erros)
            .then(function (resultado) {
                res.status(201).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarQuiz,
    salvarResultado
};