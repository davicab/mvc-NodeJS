const { getTarefas } = require("../models/tarefas")

module.exports = {
  index,
  adicionarTarefa
}

function index(req, res) {
  const tarefas = getTarefas()
  res.render('tarefas/index', { tarefas: tarefas })
}
function adicionarTarefa(req, res) {
  const { name } = req.body;
  console.log(name)
  res.render('tarefas/add', { req: name })
}