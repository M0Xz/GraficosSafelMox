import { criarGrafico, getCSS, incluirTexto } from "./common.js";

async function redesSafel() {
    const dadosLocaisString = localStorage.getItem('respostasRedes');
    
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString);
        processarDados(dadosLocais); // Processa os dados do localStorage
    } else {
        const url = 'https://raw.githubusercontent.com/M0Xz/APISafel/refs/heads/main/TERCEIROC2.json';
        const res = await fetch(url);
        const dados = await res.json();
        
        localStorage.setItem('respostasRedes', JSON.stringify(dados)); // Salva os dados no localStorage
        processarDados(dados); // Processa os dados da API
    }
}

function processarDados(dados) {
    // Achatar o array caso os dados estejam divididos em subarrays
    const todasRespostas = dados.flat(); // Isso garante que estamos pegando todas as respostas em um único array
    
    // Verificação para depuração: Exibe todas as respostas no console
    console.log('Todas as respostas:', todasRespostas);

    // Agora pegamos os objetivos das redes sociais, que estão no índice 3
    const redesSafel = todasRespostas.map(resposta => resposta[3]); // Objetivo das redes sociais está no índice 3
    
    // Limpeza dos dados: Remover espaços extras ou valores inválidos
    const redesLimpo = redesSafel
        .map(objetivo => objetivo ? objetivo.trim() : '') // Remove valores vazios ou com espaços extras
        .filter(objetivo => objetivo !== ''); // Filtra respostas vazias
    
    // Verificação para depuração: Verifique os dados limpos
    console.log('Objetivos limpos:', redesLimpo);

    // Agora vamos contar quantas vezes cada objetivo aparece
    const somaredesterceiroc = redesLimpo.reduce((acc, rede) => {
        acc[rede] = (acc[rede] || 0) + 1; // Conta as frequências dos objetivos
        return acc;
    }, {});

    // Extrair os valores (frequências) e os rótulos (nomes dos objetivos)
    const valores = Object.values(somaredesterceiroc);
    const labels = Object.keys(somaredesterceiroc);

    // Verificação para depuração: Verifique os valores e rótulos
    console.log('Frequências dos objetivos:', somaredesterceiroc);
    console.log('Valores para gráfico:', valores);
    console.log('Rótulos para gráfico:', labels);

    // Configuração do gráfico
    const data = [
        {
            values: valores,
            labels: labels,
            type: "pie",  // Gráfico de pizza
            textinfo: "label+percent",  // Exibe o rótulo e a porcentagem
        },
    ];

    const layout = {
        plot_bgcolor: getCSS("--bg-color"),
        paper_bgcolor: getCSS("--bg-color"),
        height: 700,
        title: {
            text: "Objetivos mais comuns ao acessar as Redes Sociais",
            x: 0,
            font: {
                color: getCSS("--primary-color"),
                family: getCSS("--font"),
                size: 30,
            },
        },
        legend: {
            font: {
                color: getCSS("--primary-color"),
                size: 16,
            },
        },
    };

    // Criando o gráfico com os dados
    criarGrafico(data, layout);

    // Adicionando texto ao final (você pode personalizar isso)
    incluirTexto('Coloque um <span>Texto</span> aqui.');
}

// Chama a função principal
redesSafel();
