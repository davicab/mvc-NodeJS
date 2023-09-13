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
  const tarefas = getTarefas()
  try {
    const data = tarefas; 
    const novaTarefa = {
      id: data.length + 1,
      name,
      concluida: false 
    };
    tarefas

    // Escreve os dados atualizados de volta no arquivo JSON
    fs.writeFileSync('../caminho-para-o-arquivo/tarefas.json', JSON.stringify(data, null, 2));

    return true; // Indica que a tarefa foi adicionada com sucesso
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    return false; // Indica que ocorreu um erro ao adicionar a tarefa
  }

  console.log(name)
  // res.render('tarefas/add', { req: name })
}