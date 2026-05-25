-- One Piece Database

CREATE DATABASE one_piece_projeto;

USE one_piece_projeto;

SHOW TABLES;

CREATE TABLE usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(70),
email VARCHAR(255),
senha VARCHAR(50),
dtHrCadastro DATETIME DEFAULT NOW()
);

-- LÓGICA DO QUIZ
CREATE TABLE quiz (
id_quiz INT PRIMARY KEY AUTO_INCREMENT,
descricao VARCHAR(255),
qtd_questoes INT
);

CREATE TABLE questoes (
id_questao INT PRIMARY KEY AUTO_INCREMENT,
questao VARCHAR(255),
fk_quiz INT,
CONSTRAINT ctFkQuiz
FOREIGN KEY (fk_quiz) REFERENCES quiz(id_quiz)
);

-- tabela que guarda as alternativas de cada questão, sendo uma correta (tinyint 1)
CREATE TABLE alternativas (
id_alternativa INT PRIMARY KEY AUTO_INCREMENT,
texto_alternativa VARCHAR (150),
correta TINYINT, -- se questão correta ? 1 : 0
fk_questao INT,
CONSTRAINT ctFkQuestao
FOREIGN KEY (fk_questao) REFERENCES questoes(id_questao)
);

-- respostas do usuário ao quiz
CREATE TABLE respostas_usuario (
id_resposta INT PRIMARY KEY AUTO_INCREMENT,
fk_usuario INT,
fk_alternativa INT,
CONSTRAINT ctFkUsuarioResposta
FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
CONSTRAINT ctFkAlternativa
FOREIGN KEY (fk_alternativa) REFERENCES alternativas(id_alternativa)
);

-- resultados do usuário no quiz
CREATE TABLE resultados (
id_resultado INT PRIMARY KEY AUTO_INCREMENT,
acertos INT,
erros INT,
dtHrExecucao DATETIME DEFAULT NOW(),
fk_usuario INT,
fk_quiz INT,
CONSTRAINT ctFkUsuarioResultado
FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
CONSTRAINT ctFkQuizResultado 
FOREIGN KEY (fk_quiz) REFERENCES quiz(id_quiz)
);