
-- A database deve se chamar: produtoN3


--@block
CREATE TABLE categoria(
    cod INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    PRIMARY KEY (cod)
);

--@block
CREATE TABLE produto(
    cod INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    categoria_cod INT NOT NULL,
    PRIMARY KEY (cod),
    FOREIGN KEY (categoria_cod) REFERENCES categoria(cod)
);

--@block
CREATE TABLE pedido(
    cod INT NOT NULL AUTO_INCREMENT,
    produto_cod INT NOT NULL,
    quantidade INT NOT NULL,
    PRIMARY KEY (cod),
    FOREIGN KEY (produto_cod) REFERENCES produto(cod)
);