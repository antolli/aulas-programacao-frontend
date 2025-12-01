// Função assíncrona para buscar previsão do tempo
async function buscarPrevisao(cidade) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '<p class="loading">Buscando...</p>';

    // Simulação de dados (substitua pela API real se tiver chave)
    // const apiKey = 'SUA_CHAVE_API';
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 800));

        // Dados simulados para demonstração
        const dados = simularDados(cidade);

        if (!dados) {
            throw new Error('Cidade não encontrada');
        }

        exibirResultado(dados);

    } catch (error) {
        resultado.innerHTML = `<p class="erro">Erro: ${error.message}</p>`;
    }
}

// Simula resposta da API
function simularDados(cidade) {
    const cidades = {
        'são paulo': { name: 'São Paulo', temp: 23, humidity: 72, description: 'nublado' },
        'rio de janeiro': { name: 'Rio de Janeiro', temp: 28, humidity: 65, description: 'ensolarado' },
        'curitiba': { name: 'Curitiba', temp: 18, humidity: 80, description: 'chuvoso' },
        'brasília': { name: 'Brasília', temp: 26, humidity: 45, description: 'parcialmente nublado' },
        'salvador': { name: 'Salvador', temp: 30, humidity: 70, description: 'ensolarado' }
    };

    return cidades[cidade.toLowerCase()];
}

// Exibe os dados na tela
function exibirResultado(dados) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h3>${dados.name}</h3>
        <p>Temperatura: ${dados.temp}°C</p>
        <p>Umidade: ${dados.humidity}%</p>
        <p>Descrição: ${dados.description}</p>
    `;
}

// Evento do botão
document.getElementById('buscar').addEventListener('click', () => {
    const cidade = document.getElementById('cidade').value;
    if (cidade) {
        buscarPrevisao(cidade);
    }
});

// Permite buscar com Enter
document.getElementById('cidade').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cidade = document.getElementById('cidade').value;
        if (cidade) {
            buscarPrevisao(cidade);
        }
    }
});