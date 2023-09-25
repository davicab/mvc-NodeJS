const { getTarefas } = require("../models/tarefas")
const fs = require('fs');


function index(req, res) {
  const { tarefas } = getTarefas()
  const tarefasConcluidas = [];
  const tarefasNaoConcluidas = [];

  tarefas.forEach((tarefa) => {
    if (tarefa.concluida) {
      tarefasConcluidas.push(tarefa);
    } else {
      tarefasNaoConcluidas.push(tarefa);
    }
  });
  res.render('tarefas/index', { concluidas : tarefasConcluidas, naoConcluidas : tarefasNaoConcluidas })
}
function adicionarTarefa(req, res) {
  const { name } = req.body;
  const tarefas = getTarefas()
  try {
    let data = tarefas; 

    const tarefaExistente = data.tarefas.find((tarefa) => tarefa.name === name);
    
    if (tarefaExistente) {
      return addedLista(null, res, "Tarefa ja foi adicionada anteriormente!");; 
    }

    const novaTarefa = {
      id: data.tarefas.length + 1,
      name,
      concluida: false 
    };

    data.tarefas.push(novaTarefa);

    fs.writeFileSync('./data/tarefas.json', JSON.stringify(data, null, 2));
    return res.redirect('/');
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    return addedLista(req, res, "Erro ao adicionar tarefa");
  }
}
function addedLista(req, res, msg) {
  const { tarefas } = getTarefas();
  const tarefasConcluidas = [];
  const tarefasNaoConcluidas = [];

  tarefas.forEach((tarefa) => {
    if (tarefa.concluida) {
      tarefasConcluidas.push(tarefa);
    } else {
      tarefasNaoConcluidas.push(tarefa);
    }
  });
  const mensagemResposta = msg  || "";
  res.render('tarefas/index', { tarefas: tarefas, mensagemResposta: mensagemResposta, concluidas : tarefasConcluidas, naoConcluidas : tarefasNaoConcluidas  })
}
function apagarTarefa(req, res) {
  const tarefas = getTarefas();
  const idDelete = req.body.id;
  try {
    let data = tarefas;

    const index = data.tarefas.findIndex((tarefa) => tarefa.id === parseInt(idDelete));

    if (index !== -1) {
      data.tarefas.splice(index, 1);

      fs.writeFileSync('./data/tarefas.json', JSON.stringify(data, null, 2));

      res.redirect('/');
    } else {
      res.status(404).send('Tarefa concluída não encontrada');
    }
  } catch (error) {
    console.error('Erro ao apagar tarefa concluída:', error);
    res.status(500).send('Erro ao apagar tarefa concluída');
  }
}
function editarTarefa(req, res) {
  const tarefas = getTarefas();
  const idUpdate = req.body.id;
  try {
    let data = tarefas;

    const tarefa = data.tarefas.find((tarefa) => tarefa.id === parseInt(idUpdate));

    if (tarefa) {
      tarefa.concluida = true;

      fs.writeFileSync('./data/tarefas.json', JSON.stringify(data, null, 2));

      res.redirect('/');
    } else {
      return false;
    }
  } catch (error) {
    console.error('Erro ao editar tarefa:', error);
    return false; 
  }
}

module.exports = {
  index,
  adicionarTarefa,
  addedLista,
  apagarTarefa,
  editarTarefa
}