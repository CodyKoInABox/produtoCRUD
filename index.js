const express = require('express')
const res = require('express/lib/response')
const app = express()

const PORT = process.env.PORT || 8080

const mysql = require('mysql2')

// connect to a mysql database named produtoN3
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'produtoN3' // aqui vai o nome da database, ela deve seguir o padrao encontrado no README.md deste repositorio
})

app.get('/ping', (req, res) => {
    res.send('pong!')
})


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


//-------------------------//
//  FIM
//-------------------------//
//  CRUD -> PEDIDO
//-------------------------//


app.listen(PORT, () => {
    console.log(`Live on port ${PORT}`)
})