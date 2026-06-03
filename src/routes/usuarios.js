var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// rotas para uso na dash
router.get("/buscarPersonagem/:idUsuario", usuarioController.buscarPersonagem);

router.put("/atualizarPersonagem/:idUsuario", usuarioController.atualizarPersonagem);

module.exports = router;