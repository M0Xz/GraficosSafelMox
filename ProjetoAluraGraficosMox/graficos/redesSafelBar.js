import { criarGrafico, getCSS, incluirTexto, tickConfig } from "./common.js";

async function redesSafel() {
    const dadosLocaisString = localStorage.getItem('respostasRedes');
    let dadosLocais;

    if (dadosLocaisString) {
        dadosLocais = JSON.parse(dadosLocaisString);
    } else {
        const url = 'https://raw.githubusercontent.com/M0Xz/APITest/refs/heads/main/TERCEIROC.json';
        const res = await fetch(url);
        dadosLocais = await res.json();
        localStorage.setItem('respostasRedes', JSON.stringify(dadosLocais));
    }

    processarDados(dadosLocais);
}

function processarDados(dados) {
    const redesSafel = dados.slice(3).map(redes => redes[3]);
    const somaredesterceiroc = redesSafel.reduce((acc, rede) => {
        acc[rede] = (acc[rede] || 0) + 1;
        return acc;
    }, {});

    const valores = Object.values(somaredesterceiroc);
    const labels = Object.keys(somaredesterceiroc);

    const data = [
        {
            x: labels,
            y: valores,
            type: 'bar',
            marker: {
                color: getCSS('--primary-color'),
            },
        },
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: "Redes sociais que os Mini Gênios mais gostam",
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30,
            },
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: "Nome das redes sociais",
                font: {
                    color: getCSS('--secundary-color'),
                },
            },
            tickangle: -45,
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: "Número de Respostas",
                font: {
                    color: getCSS('--secundary-color'),
                },
            },
        },
    };

    criarGrafico(data, layout);
    incluirTexto(`Coloque um <span>Texto</span> aqui.`);
}

redesSafel();
