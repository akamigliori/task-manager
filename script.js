const inputTexto = document.getElementById('input-texto');
const botaoAdicionar = document.getElementById('botao-principal');
const listaTarefas = document.getElementById('tarefas');

function salvarDados() {
    localStorage.setItem('listaDaMinhaNamorada', listaTarefas.innerHTML);
}

function mostrarTarefas() {
    listaTarefas.innerHTML = localStorage.getItem('listaDaMinhaNamorada') || '';
}


botaoAdicionar.addEventListener('click', function () {
    const textoDaTarefa = inputTexto.value; //lê o texto digitado

    if (textoDaTarefa !== '') { //verifica se não está vazio
        const novoItem = document.createElement('li'); //cria um novo elemento  <li>

        const textoSpan = document.createElement('span');
        textoSpan.textContent = textoDaTarefa;

        const botaoConcluido = document.createElement('button');
        botaoConcluido.textContent = 'Concluído';
        botaoConcluido.classList.add('btn-concluido');

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Apagar';
        botaoRemover.classList.add('btn-remover');

        const divBotoes = document.createElement('div');

        novoItem.appendChild(textoSpan);
        divBotoes.appendChild(botaoConcluido);
        divBotoes.appendChild(botaoRemover);
        novoItem.appendChild(divBotoes);
        listaTarefas.appendChild(novoItem); //cola o <li> pronto dentro da <ul> na tela

        salvarDados();

        inputTexto.value = ''; //limpa o campo de texto para a próxima tarefa
    }
});

listaTarefas.addEventListener('click', function (evento) {
    if (evento.target.classList.contains('btn-concluido')) {

        const itemLi = evento.target.closest('li');
        itemLi.classList.toggle('concluida');

        salvarDados();
    }

    else if (evento.target.classList.contains('btn-remover')) {
        const itemLi = evento.target.closest('li');
        console.log('Botão clicado li encontrado: ', itemLi);

        itemLi.classList.add('saindo');

        itemLi.addEventListener('transitionend', function() {
            console.log('Transição terminou, removendo item');
            itemLi.remove();
            salvarDados();
        });
    }
});

mostrarTarefas();