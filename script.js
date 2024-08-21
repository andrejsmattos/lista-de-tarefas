const btnAdicionar = document.getElementById("btn-adicionar");
let listaUl = document.getElementById("ul-lista");
let listaDeTarefas = lerListaTarefas() || [];

function criarTarefa() {
  const inputTarefa = document.getElementById("input-tarefa").value;

  if (inputTarefa == "") {
    alert("Tarefa não preenchida. Insira uma tarefa à sua lista.");
  } else {
    
    let tarefa = {
      status: false,
      tituloDaTarefa: inputTarefa,
    };

    listaDeTarefas.push(tarefa);

    localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));

    renderizarLista();

    document.getElementById("input-tarefa").value = "";
  }
}

function renderizarLista() {
  listaUl.innerHTML = "";

  listaDeTarefas.map((tarefa, index) => {
    let item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "statusTarefa" + index;
    checkbox.checked = tarefa.status;

    let span = document.createElement("span");
    span.textContent = tarefa.tituloDaTarefa;
    // span.className = tarefa.status ? "text-muted" : "";

    if (tarefa.status) {
      span.style.textDecoration = "line-through";
    }

    let button = document.createElement("button");
    button.innerHTML = '<i class="fas fa-trash-alt"></i>';
    button.className = "btn btn-link remove-button";

    // Adiciona o evento de clique ao checkbox para atualizar o estilo e o localStorage
    checkbox.addEventListener("change", function () {
      atualizarEstiloTarefa(span, checkbox.checked, index);
    });
    item.appendChild(checkbox);
    item.appendChild(span);
    item.appendChild(button);

    listaUl.appendChild(item);
    

    // Adiciona o evento de clique ao botão de remover
    button.addEventListener("click", function () {
      const confirmaRemocao = confirm("Você tem certeza que deseja excluir esta tarefa?");
      if (confirmaRemocao) {
        removerTarefa(index);
      } 

    });

  });

  // Chama a função para exibir o contador
  exibirContador();
}


// Atualiza o estilo da tarefa com line-through
function atualizarEstiloTarefa(elemento, statusCheckbox, index) {
  if (index >= 0 && index < listaDeTarefas.length) {
    if (statusCheckbox) {
      elemento.style.textDecoration = "line-through";
    } else {
      elemento.style.textDecoration = "none";
    }

    // Atualiza o estado da tarefa no array
    listaDeTarefas[index].status = statusCheckbox;

    // Salva o array atualizado no localStorage
    localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));
  }
}


function removerTarefa(index) {
  listaDeTarefas.splice(index, 1);
  localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));
  renderizarLista();
}


function lerListaTarefas() {
  let listaDeTarefas = localStorage.getItem("tarefas");

  if (!!listaDeTarefas) {
    return JSON.parse(listaDeTarefas);
  }

  return [];
}


function exibirContador() {
  const contador = document.getElementById("contador");
  contador.textContent = `Total de Tarefas: ${listaDeTarefas.length}`;
}


btnAdicionar.addEventListener("click", criarTarefa);
document.getElementById("input-tarefa")
  .addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      criarTarefa();
    }
});

renderizarLista();
