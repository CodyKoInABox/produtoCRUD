const express = require('express')
const res = require('express/lib/response')
const app = express()

const PORT = process.env.PORT || 9090

const mysql = require('mysql2')

// connect to a mysql database named produtoN3
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'serversiden3' // aqui vai o nome da database, ela deve seguir o padrao encontrado no README.md deste repositorio
})

require("dotenv").config();

const jwt = require('jsonwebtoken')

app.use(express.json())

app.get('/ping/:token', authToken, (req, res) => {

    res.send('pong! Hello, ' + req.user.name + ' !')
})

// TODO:
// -> verificar se quantidade de produto bate com os requisitos na hora de: aumentar produto, diminuir produto, criar produto.
// -> pedido de 4 se quantidade <= 3
// -> pedido de 3 se 3 > quantidade < 7


app.get('/login/:username', (req, res) => {

    const username = req.params.username
    const user = { name: username }


    const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({acessToken: acessToken})
})


function authToken(req, res, next){
    const token = req.params.token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403)
        }

        req.user = user
        next()
    })

}

//-------------------------//
//  INICIO
//-------------------------//
//  CRUD -> PRODUTO
//-------------------------//

// criar novo produto
app.get('/criarproduto/:nome/:quantidade/:categoriacod', (req, res) => {

    let query = `INSERT INTO produto(nome, quantidade, categoria_cod) VALUES (${req.params.nome}, ${req.params.quantidade}, ${req.params.categoriacod});`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})


// lista com todos os produtos com a opcao de listar por categoria
app.get('/listarprodutos', (req, res) =>{

    let query = 'SELECT * FROM produto'

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// buscar produtos de certa categoria
app.get('/produtosporcategoria/:categoria', (req, res) => {

    let query = `SELECT p.cod, p.nome, p.quantidade FROM produto p INNER JOIN categoria c ON c.cod = p.categoria_cod WHERE c.nome = "${req.params.categoria}"`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })
})

// buscar produtos por quantidade de pedidos
app.get('/produtosporpedidos/:numerodepedidos', (req, res) => {

    let query = `SELECT p.cod, p.nome, p.quantidade FROM produto p INNER JOIN categoria c ON c.cod = p.categoria_cod WHERE COUNT(c.cod) = ${req.params.numerodepedidos}`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })
})


// atualizar informacao de um produto por codigo
app.get('/atualizarproduto/:cod/:nome/:quantidade/:categoriacod', (req, res) => {

    let query = `UPDATE produto SET nome = ${req.params.nome}, quantidade = ${req.params.quantidade}, categoria = ${req.params.categoriacod} WHERE cod = ${req.params.cod};`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// apagar produto
app.get('/deletarproduto/:nome', (req, res ) => {

    let query = `DELETE FROM produto WHERE nome = ${req.params.nome};`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// adicionar mais quantidade de um produto
app.get('/adicionarproduto/:nome/:quantidade', (req, res ) =>{

    let query = `UPDATE produto SET quantidade = quantidade + ${req.params.quantidade} WHERE nome = '${req.params.nome}';`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

    let testQuery = `SELECT quantidade FROM produto WHERE nome = "${req.params.nome}";`
    let temp;

    connection.query(testQuery, (err, results, fields) => {
        
        if(results[0].quantidade <= 3){

            temp = true

        }else if(results[0].quantidade < 7){

            temp = false
        }
    })

    let newQuery;
    if(temp){
        newQuery = `INSERT INTO pedido(produto_cod, quantidade) SELECT p.cod, 4 FROM produto p WHERE p.nome = "${req.params.nome}"`
    }else{
        newQuery = `INSERT INTO pedido(produto_cod, quantidade) SELECT p.cod, 3 FROM produto p WHERE p.nome = "${req.params.nome}"`
    }

    connection.query(newQuery, (err, results, fields) =>{
        if(err == null){
            console.log("Pedido Criado! -> " + results)
        }else{
            console.log(err)
        }
    })

    newQuery = '';
})


// remover quantidade de um produto
app.get('/removerproduto/:nome/:quantidade', (req, res) =>{

    let query = `UPDATE produto SET quantidade = quantidade - ${req.params.quantidade} WHERE nome = '${req.params.nome}';`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })


    let testQuery = `SELECT quantidade FROM produto WHERE nome = "${req.params.nome}";`
    let temp;

    connection.query(testQuery, (err, results, fields) => {
        
        if(results[0].quantidade <= 3){

            temp = true

        }else if(results[0].quantidade < 7){

            temp = false
        }
    })

    let newQuery;
    if(temp){
        newQuery = `INSERT INTO pedido(produto_cod, quantidade) SELECT p.cod, 4 FROM produto p WHERE p.nome = "${req.params.nome}"`
    }else{
        newQuery = `INSERT INTO pedido(produto_cod, quantidade) SELECT p.cod, 3 FROM produto p WHERE p.nome = "${req.params.nome}"`
    }

    connection.query(newQuery, (err, results, fields) =>{
        if(err == null){
            console.log("Pedido Criado! -> " + results)
        }else{
            console.log(err)
        }
    })

    newQuery = '';

})

//-------------------------//
//  FIM
//-------------------------//
//  CRUD -> PRODUTO
//-------------------------//


//-------------------------//
//  INICIO
//-------------------------//
//  CRUD -> CATEGORIA
//-------------------------//


// listar todas as categorias
app.get('/listarcategorias', (req, res) =>{

    let query = 'SELECT * FROM categoria'

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// criar nova categoria
app.get('/criarcategoria/:nome', (req, res) => {

    let query = `INSERT INTO categoria(nome) VALUES (${req.params.nome});`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// atualizar uma categoria com base em seu codigo
app.get('/atualizarcategoria/:cod/:nome', (req, res) => {

    let query = `UPDATE categoria SET nome = ${req.params.nome} WHERE cod = ${req.params.cod};`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// deletar uma categoria
app.get('/deletarcategoria/:nome', (req, res ) => {

    let query = `DELETE FROM categoria WHERE nome = ${req.params.nome};`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

//-------------------------//
//  FIM
//-------------------------//
//  CRUD -> CATEGORIA
//-------------------------//

//-------------------------//
//  INICIO
//-------------------------//
//  CRUD -> PEDIDO
//-------------------------//

// listar todos os pedidos
app.get('/listarpedidos', (req, res) =>{

    let query = 'SELECT * FROM pedido'

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// criar novo pedido
app.get('/criarpedido/:produtocod/:quantidade', (req, res) => {

    let query = `INSERT INTO pedido(produto_cod, quantidade) VALUES (${req.params.produtocod}, ${req.params.quantidade});`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// atualizar um pedido com base em seu codigo
app.get('/atualizarpedido/:cod/:produtocod/:quantidade', (req, res) => {

    let query = `UPDATE pedido SET produto_cod = ${req.params.produtocod}, quantidade = ${req.params.quantidade} WHERE cod = ${req.params.cod};`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

// deletar um pedido
app.get('/deletarpedido/:cod', (req, res ) => {

    let query = `DELETE FROM pedido WHERE cod = ${req.params.cod};`

    connection.query(query, (err, results, fields) => {

        if(err == null){
            res.status(400).json(results)
        }else{
            res.status(200).send(err)
        }
    })

})

//-------------------------//
//  FIM
//-------------------------//
//  CRUD -> PEDIDO
//-------------------------//


app.listen(PORT, () => {
    console.log(`Live on port ${PORT}`)
})
