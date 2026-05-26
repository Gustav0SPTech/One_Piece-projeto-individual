var database = require("../database/config");

// no model, criamos as instruções SQL

// primeira função com instrução para buscar o quiz com select das questoes JOIN alternativas 

function buscarQuiz(idQuiz) {
    
    var instrucaoSql = `
        SELECT 
            q.id_quiz,
            q.descricao,
            quest.id_questao,
            quest.questao,
            alt.id_alternativa,
            alt.texto_alternativa,
            alt.correta
        FROM quiz q
        JOIN questoes quest ON quest.fk_quiz = q.id_quiz
        JOIN alternativas alt ON alt.fk_questao = quest.id_questao
        WHERE q.id_quiz = ${idQuiz};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// função com instrução para inserir os dados enviados ao concluir o quiz
// com dados do usuário e dados do quiz

function salvarResultado(idUsuario, idQuiz, acertos, erros) {
    var instrucaoSql = `
        INSERT INTO resultados (acertos, erros, fk_usuario, fk_quiz) 
        VALUES (${acertos}, ${erros}, ${idUsuario}, ${idQuiz});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarQuiz,
    salvarResultado
};