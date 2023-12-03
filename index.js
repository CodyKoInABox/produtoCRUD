const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

const mysql = require('mysql2')

// connect to a mysql database named produtosN3
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'produtosN3' // aqui vai o nome da database, ela deve seguir o padrao encontrado no README.md deste repositorio
})

app.get('/ping', (req, res) => {
    res.send('pong!')
})

app.listen(PORT, () => {
    console.log(`Live on port ${PORT}`)
})