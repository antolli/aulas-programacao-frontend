const formulario = document.getElementById('form-html5');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    if (formulario.checkValidity()) {
        alert('Formulário válido! Dados podem ser enviados.');
        console.log('E-mail:', document.getElementById('email').value);
        console.log('Idade:', document.getElementById('idade').value);
        console.log('Senha:', document.getElementById('senha').value);
        console.log('Website:', document.getElementById('site').value);
    } else {
        alert('Por favor, corrija os erros no formulário.');
    }
});