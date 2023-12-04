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


// CRUD produto:

// criar novo produto
app.get('/criarproduto/:nome/:quantidade/:categoria', (req, res) => {


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
app.get('/atualizarproduto/:cod/:nome/:quantidade/:categoria', (req, res) => {

})

// apagar produto
app.get('/deletarproduto/:nome', (req, res ) => {

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


app.listen(PORT, () => {
    console.log(`Live on port ${PORT}`)
})