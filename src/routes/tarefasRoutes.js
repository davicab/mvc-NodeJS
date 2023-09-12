const express = require('express')
const router = express.Router()

const tarefas = require('../controllers/tarefasController')

router.get('/', (req, res) => {
  tarefas.index(req, res)
})


router.post('/tarefa/add', (req, res) => {
  tarefas.adicionarTarefa(req, res);
});

module.exports = router