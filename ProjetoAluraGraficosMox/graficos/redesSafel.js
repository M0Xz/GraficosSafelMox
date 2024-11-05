import { criarGrafico, getCSS, incluirTexto } from "./common.js"

async function redesSafel() {
    const dadosLocaisString = localStorage.getItem('respostasRedes')
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString)
        processarDados(dadosLocais)
    } else {
        const url = 'https://raw.githubusercontent.com/M0Xz/APITest/refs/heads/main/TERCEIROC.json'
        const res = await fetch(url) 
        const dados = await res.json()
        localStorage.setItem('respostasRedes', JSON.stringify(dados))
        processarDados(dadosLocais)
    }
}

function processarDados(dados) {
    const redesSafel = dados.slice(3).map(redes => redes[3])
    const somaredesterceiroc = redesSafel.reduce((acc, redesSafel) => {
        acc[redesSafel] = (acc[redesSafel] || 0) + 1
        return acc
    }, {})
    const valores = Object.values(somaredesterceiroc)
    const label = Object.keys(somaredesterceiroc)

    const data = [
        {
          values: valores,
          labels: label,
          type: "pie",
          textinfo: "label+percent",
        },
      ];
    
      const layout = {
        plot_bgcolor: getCSS("--bg-color"),
        paper_bgcolor: getCSS("--bg-color"),
        height: 700,
        title: {
          text: "Redes sociais que os Mini Gênios mais gostam",
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
    
      criarGrafico(data, layout)

      incluirTexto(`Coloque um <span>Texto</span> aqui.`)
}

redesSafel()