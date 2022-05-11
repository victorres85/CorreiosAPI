const form = document.querySelector('#form')
const nome = document.getElementById('nome')
const cpf = document.getElementById('cpf')
const email = document.getElementById('email')
const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')
const mensagem = document.querySelector('#mensagem')
const notNull = document.getElementsByClassName('not-null')
const url = 'viacep.com.br/ws/01001000/json/'

function isEmpty(elem) {
    return elem.value.length < 1 ?
        `Por favor completar o campo <strong>${elem.name}</strong>` : '';
}

function validaEmail(elem) {
    return elem.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : `Digite um <strong>e-mail</strong> valido`;
}
function validaCep(elem) {
    return elem.value.match(/[0-9]{8}/) ? '' : `O <strong> CEP </strong> digitado nao foi encontrado`;
}


form.addEventListener('submit', function (event) {
    event.preventDefault();
    let msg = []
    let markup = ''

    Array.from(notNull).forEach(field => {
        let fieldState = isEmpty(field)
        if (fieldState)
            msg.push(fieldState)
    });

    const isCep = validaCep(cep);
    if (isCep) msg.push(isCep);

    let script = document.createElement('script');
    script.src = 'https://viacep.com.br/ws/' + cep.value + '/json/?callback=getAddress';
    document.body.appendChild(script);

    const isEmail = validaEmail(email);
    if (isEmail) msg.push(isEmail);

    msg.forEach(item => {
        markup += `<p>${item}</p>`

    });

    mensagem.innerHTML = markup;
});

function getAddress(data) {
    if (!("erro" in data)) {
        rua.value = (data.logradouro);
        bairro.value = (data.bairro);
        cidade.value = (data.localidade);
        uf.value = (data.uf);
        mensagem.innerHTML = ''
    } else {
        mensagem.innerHTML = 'CEP nao encontrado'
    }
}
