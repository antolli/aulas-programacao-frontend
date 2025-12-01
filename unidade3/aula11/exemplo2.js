function debounce(funcao, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => funcao.apply(this, args), delay);
    };
}

function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{2})$/, '$1-$2');
    return valor;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;
    return true;
}

const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const campoCPF = document.getElementById('cpf');
const campoSenha = document.getElementById('senha');
const formulario = document.getElementById('form-progressivo');

const erroNome = document.getElementById('erro-nome');
const erroEmail = document.getElementById('erro-email');
const erroCPF = document.getElementById('erro-cpf');
const erroSenha = document.getElementById('erro-senha');

function validarNome() {
    const valor = campoNome.value;
    
    if (valor.length === 0) {
        campoNome.className = '';
        erroNome.textContent = '';
        return false;
    }
    
    if (valor.length < 3) {
        campoNome.className = 'invalido';
        erroNome.textContent = 'Nome deve ter no mínimo 3 caracteres';
        return false;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(valor)) {
        campoNome.className = 'invalido';
        erroNome.textContent = 'Apenas letras, números e underscore';
        return false;
    }
    
    campoNome.className = 'valido';
    erroNome.textContent = '';
    return true;
}

function validarEmail() {
    const valor = campoEmail.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (valor.length === 0) {
        campoEmail.className = '';
        erroEmail.textContent = '';
        return false;
    }
    
    if (!regex.test(valor)) {
        campoEmail.className = 'invalido';
        erroEmail.textContent = 'E-mail inválido';
        return false;
    }
    
    campoEmail.className = 'valido';
    erroEmail.textContent = '';
    return true;
}

function validarCampoCPF() {
    const valor = campoCPF.value;
    
    if (valor.length === 0) {
        campoCPF.className = '';
        erroCPF.textContent = '';
        return false;
    }
    
    if (!validarCPF(valor)) {
        campoCPF.className = 'invalido';
        erroCPF.textContent = 'CPF inválido';
        return false;
    }
    
    campoCPF.className = 'valido';
    erroCPF.textContent = '';
    return true;
}

function validarSenha() {
    const valor = campoSenha.value;
    
    const requisitos = {
        tamanho: valor.length >= 8,
        letra: /[a-zA-Z]/.test(valor),
        numero: /\d/.test(valor)
    };
    
    document.getElementById('req-tamanho').classList.toggle('atendido', requisitos.tamanho);
    document.getElementById('req-letra').classList.toggle('atendido', requisitos.letra);
    document.getElementById('req-numero').classList.toggle('atendido', requisitos.numero);
    
    if (valor.length === 0) {
        campoSenha.className = '';
        erroSenha.textContent = '';
        return false;
    }
    
    if (!requisitos.tamanho || !requisitos.letra || !requisitos.numero) {
        campoSenha.className = 'invalido';
        erroSenha.textContent = 'Senha não atende aos requisitos';
        return false;
    }
    
    campoSenha.className = 'valido';
    erroSenha.textContent = '';
    return true;
}

campoNome.addEventListener('input', debounce(function() {
    if (this.value.length > 0) {
        validarNome();
    }
}, 300));

campoNome.addEventListener('blur', validarNome);

campoEmail.addEventListener('input', debounce(function() {
    if (this.value.length > 0) {
        validarEmail();
    }
}, 300));

campoEmail.addEventListener('blur', validarEmail);

campoCPF.addEventListener('input', function() {
    this.value = formatarCPF(this.value);
    if (this.value.length > 0) {
        validarCampoCPF();
    }
});

campoCPF.addEventListener('blur', validarCampoCPF);

campoSenha.addEventListener('input', debounce(function() {
    if (this.value.length > 0) {
        validarSenha();
    }
}, 300));

campoSenha.addEventListener('blur', validarSenha);

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const cpfValido = validarCampoCPF();
    const senhaValida = validarSenha();
    
    if (nomeValido && emailValido && cpfValido && senhaValida) {
        alert('Formulário válido! Dados podem ser enviados.');
        console.log('Nome:', campoNome.value);
        console.log('E-mail:', campoEmail.value);
        console.log('CPF:', campoCPF.value);
        console.log('Senha:', campoSenha.value);
        
        formulario.reset();
        document.querySelectorAll('.valido, .invalido').forEach(el => {
            el.classList.remove('valido', 'invalido');
        });
        document.querySelectorAll('.mensagem-erro').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('.atendido').forEach(el => {
            el.classList.remove('atendido');
        });
    } else {
        alert('Por favor, corrija os erros antes de enviar.');
    }
});