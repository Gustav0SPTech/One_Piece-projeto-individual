// Vinculando o arquivo model que criamos acima
var dashboardModel = require("../models/dashModel");

function buscarDadosPerfil(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.buscarDadosPerfil(idUsuario).then(function (resultado) {
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

function buscarRecorde(req, res) {
    var idUsuario = req.params.idUsuario;
    dashboardModel.buscarRecorde(idUsuario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarQtdQuizzes(req, res) {
    var idUsuario = req.params.idUsuario;
    dashboardModel.buscarQtdQuizzes(idUsuario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarEvolucaoPessoal(req, res) {
    // limite linhas para gráfico de evolução
    const limite_linhas = 5;

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando os últimos ${limite_linhas} resultados do usuário de ID: ${idUsuario}`);

    dashboardModel.buscarEvolucaoPessoal(idUsuario, limite_linhas)
        .then(function (resultado) {
            if (resultado.length > 0) {
                // inverter o array com .reverse() para que o gráfico mostre a evolução da esquerda (mais antiga) para a direita (mais recente)
                res.status(200).json(resultado.reverse());
            } else {
                res.status(204).send("Nenhum resultado de evolução encontrado para este usuário!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados de evolução pessoal.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarTopRanking(req, res) {
    const limite_linhas = 5;

    console.log(`Recuperando os top ${limite_linhas} jogadores cadastrados no sistema`);

    dashboardModel.buscarTopRanking(limite_linhas)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum registro encontrado no ranking global!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados do ranking global.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Exportando as funções para serem usadas no arquivo de rotas
module.exports = {
    buscarDadosPerfil,
    buscarRecorde,
    buscarQtdQuizzes,
    buscarEvolucaoPessoal,
    buscarTopRanking
};