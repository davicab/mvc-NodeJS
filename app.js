const express = require('express')
const tarefas = require('./src/routes/tarefasRoutes')
var bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(tarefas)

app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
  console.log('Aplicação executando na porta 3000')
})