const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const listaTarefas = document.querySelector('.tarefas');


recuperaTarefasdoNavegador();


document.addEventListener('click', function(e) {
    const el = e.target;
    
    if (el.classList.contains('material-symbols-outlined')) {
        el.parentElement.remove();
    }
    salvaTarefas();
});

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    
    criaTarefa(inputTarefa.value);
    salvaTarefas();
    limpaInput();
});

inputTarefa.addEventListener('keypress', function(e) {
    if (!inputTarefa.value) return;
    
    if (e.keyCode === 13) {
        
        criaTarefa(inputTarefa.value);
        salvaTarefas();
        limpaInput();
    }
});


function removeTarefa(li) {
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'delete';
    botaoApagar.setAttribute('class', 'material-symbols-outlined');
    li.appendChild(botaoApagar);
}

function limpaInput() {
    inputTarefa.value = null; // após o clique, o campo input é resetado
    inputTarefa.focus();
}



//esta função tem apens a responsabilidade de criar a tarefa utilizando a função criaLi
function criaTarefa(tarefa) {
    const li = criaLi();        
    li.innerText = tarefa;
    listaTarefas.appendChild(li);
    removeTarefa(li);
}

//apenas cria a tag html
function criaLi() {
    const li = document.createElement('li');
    return li;
}

function salvaTarefas() {
    const todasAsTarefas = listaTarefas.querySelectorAll('li');
    const valorDasTarefas = [];
    
    for (let tarefa of todasAsTarefas) {
        let tarefaTexto = tarefa.innerText;

        tarefaTexto =  tarefa.innerText.replace('delete', '').trim();
        
        valorDasTarefas.push(tarefaTexto);
        console.log(valorDasTarefas, tarefaTexto)
    }
    
    const tarefasJSON = JSON.stringify(valorDasTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
};


function recuperaTarefasdoNavegador() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
        };
}
