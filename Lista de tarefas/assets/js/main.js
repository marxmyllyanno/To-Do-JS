const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
    const li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){ //keyCode 13 é o código do botão ENTER
        if (!inputTarefa.value) return;  //se inputTarefa.value não estiver vazio, pode retornar 
        criaTarefa(inputTarefa.value)
    }
})

function limpaTarefa(){
    inputTarefa.value = ''
    inputTarefa.focus() 
}

function criaBotaoApagar(li){
    li.innerText += ' ' //da um espaço no botão pra não ficar muito colado do lado do li que foi criado
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'  
    //botaoApagar.classList.add('apagar') - adciona a classe pro elemento que foi criado
    botaoApagar.setAttribute('class', 'apagar')  //class = atributo - apagar = nome da classe
    botaoApagar.setAttribute('title', 'apagar esta tarefa')
    li.appendChild(botaoApagar)
}

function criaTarefa(textoInput){
    const li = criaLi()
    li.innerHTML = textoInput
    tarefas.appendChild(li)
    limpaTarefa()
    criaBotaoApagar(li)
    salvarTarefas()
}

btnTarefa.addEventListener('click', function(e){
    if (!inputTarefa.value) return;  //se inputTarefa.value não estiver vazio, pode retornar 
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(e){  //função de apagar
    const el = e.target
    //console.log(el)
    if (el.classList.contains('apagar')){
        //console.log('apagar clicado')
        //console.log(el.parentElement)
        el.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim() //trim serve para tirar o "spaço" morto 
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON) // tarefas é o nome que você vai procurar para carregar as informações//local Storage é um local no navegador que salva as informações
}

function adcionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
    }
}

adcionaTarefasSalvas()