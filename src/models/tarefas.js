const fs = require('fs')

function getAll() {
  const tarefas = JSON.parse(fs.readFileSync('./data/tarefas.json', 'utf8'))
  return tarefas
}

function getTarefas() {
  const tarefas = getAll()
  return tarefas
}

module.exports = {
  getTarefas,
}