const form = document.querySelector('#formulario')
form.onsubmit = analisarForm

function analisarForm() {
    const divRetorno = document.querySelector('#retorno')

    var q = [] //questoes
    var rq = [] //Resposta das questoes
    var na = 0 // Contagem do numero de respostas
    var nb = 0 // Contagem do numero de respostas
    var nc = 0 // Contagem do numero de respostas
    var nd = 0 // Contagem do numero de respostas
    var texto = '' // texto para a div

    // Preenche o array com os radio button marcados
    for (let i = 1; i <= 6; i++) {
        q.push(document.querySelector(`[name=questao${i}]:checked`))
        if (q[i-1] === null) {
            //alert(`A questão ${i} não foi respondida.`)
            criarAlerta(`A questão ${i} não foi respondida.`, 'div-alertas')
            //Finaliza a rotina caso haja alguma questão nao marcada
            return false
        }
    }
    
    // Preenche o array com valores das questoes marcadas
    for (let i = 0; i < 6; i++) {
        rq.push(q[i].value)
    }
    
    // Faz a contagem do numero de marcações de cada alternativa
    for (let i = 0; i < rq.length; i++) {
        if (rq[i] === "a") {
            na += 1
        } else if(rq[i] === "b") {
            nb += 1
        } else if(rq[i] === "c") {
            nc += 1
        } else if(rq[i] === "d") {
            nd += 1
        }
    }

    // Converção em percentagem
    na *= (100/rq.length)
    nb *= (100/rq.length)
    nc *= (100/rq.length)
    nd *= (100/rq.length)

    // Constroi a respota em texto HTML
    if (na.toFixed(1) != 0) {
        texto += `Você é ${na.toFixed(1)}% A <br>`
    }
    if(nb.toFixed(1) != 0) {
        texto += `Você é ${nb.toFixed(1)}% B <br>`
    }
    if(nc.toFixed(1) != 0) {
        texto += `Você é ${nc.toFixed(1)}% C <br>`
    }
    if(nd.toFixed(1) != 0) {
        texto += `Você é ${nd.toFixed(1)}% D <br>`
    }

    // Mostra o Modal
    document.getElementById('btn-modal').click()

    // Anexa a resposta a div
    divRetorno.innerHTML = texto
    document.getElementById('div-resultado').innerHTML = texto
    document.getElementById('div-resultado').style.display = 'block'

    // Rola para o topo da pagina
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Previne o envio do form
    return false
}

function criarAlerta(texto, idElementoPai) {
    pai = document.getElementById(idElementoPai)

    // Criando a div do alerta
    divMsgAlerta = document.createElement('div')
    divMsgAlerta.className = 'alert alert-danger alert-dismissible fade show'
    
    // Criando o botao de fechar o alerta
    btnFechar = document.createElement('button')
    btnFechar.type = 'button'
    btnFechar.className = 'close'
    btnFechar.dataset.dismiss = "alert"
    btnFechar.appendChild(document.createTextNode("×")) //&times;
    divMsgAlerta.appendChild(btnFechar)

    // Adicionando o texto ao alerta
    divMsgAlerta.appendChild(document.createTextNode(texto))

    // Adicionando o alerta ao elemento pai
    pai.appendChild(divMsgAlerta)
}