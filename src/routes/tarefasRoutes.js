const express = require('express')
const router = express.Router()

const tarefas = require('../controllers/tarefasController')

router.get('/', (req, res) => {
  tarefas.index(req, res)
})

router.post('/tarefa/add', (req, res) => {
  tarefas.adicionarTarefa(req, res);
});
router.get('/tarefa/add', (req, res) => {
  tarefas.addedLista(req, res);
});
router.post('/tarefa/remove', (req, res) => {
  tarefas.apagarTarefa(req, res);
});
router.post('/tarefa/update', (req, res) => {
  tarefas.editarTarefa(req, res);
});

module.exports = router