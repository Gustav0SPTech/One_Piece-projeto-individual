var database = require("../database/config");

function buscarDadosPerfil(idUsuario) {
    var instrucaoSql = `
        SELECT nome, DATE_FORMAT(dtHrCadastro, '%d/%m/%Y') AS data_formatada 
        FROM usuario 
        WHERE id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRecorde(idUsuario) {
    // Traz o maior número de acertos que aquele usuário específico já conseguiu
    var instrucaoSql = `
        SELECT MAX(acertos) as max_acertos 
        FROM resultados 
        WHERE fk_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEvolucaoPessoal(idUsuario, limite_linhas) {
    // acertos e a data das ultimas tentativas do quiz (evolução pessoal)
    var instrucaoSql = `
        SELECT 
            acertos, 
            DATE_FORMAT(dtHrExecucao, '%H:%i:%s') as momento_jogo
        FROM resultados 
        WHERE fk_usuario = ${idUsuario} 
        ORDER BY id_resultado DESC 
        LIMIT ${limite_linhas};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTopRanking(limite_linhas) {
    // ranking global de pontuação dos usuários
    var instrucaoSql = `
        SELECT 
            u.nome, 
            MAX(r.acertos) as recorde_pessoal
        FROM resultados r
        JOIN usuario u ON r.fk_usuario = u.id_usuario
        GROUP BY u.id_usuario, u.nome
        ORDER BY recorde_pessoal DESC
        LIMIT ${limite_linhas};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPersonagem(idUsuario) {
    var instrucao = `SELECT p.nome FROM personagem p JOIN usuario u ON u.fk_personagem = p.id_personagem WHERE u.id_usuario = ${idUsuario};`;
    return database.executar(instrucao);
}

function atualizarPersonagem(idUsuario, idPersonagem) {
    var instrucao = `UPDATE usuario SET fk_personagem = ${idPersonagem} WHERE id_usuario = ${idUsuario};`;
    return database.executar(instrucao);
}

module.exports = {
    buscarDadosPerfil,
    buscarRecorde,
    buscarEvolucaoPessoal,
    buscarTopRanking
};