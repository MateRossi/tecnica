//libs para ler o arquivo JSON na questão 3.
const fs = require('fs');
const path = require('path');

// Questão 1:
let indice = 13;
let soma = 0;
let k = 0;

while (k < indice) {
    k = k + 1;
    soma = soma + k;
}

console.log("Valor da soma: ", soma);

//Questão 2:
function fibonacci(n) {
    let fibonacci = [0, 1];
    while (fibonacci[fibonacci.length - 1] < n) {
        fibonacci.push(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
    } return fibonacci;
}

function isInFibonacci(n) {
    let sequenciaFibonacci = fibonacci(n);
    if (sequenciaFibonacci.includes(n)) {
        return `O número ${n} pertence à sequência de Fibonacci.`;
    } else {
        return `O número ${n} não pertence à sequência de Fibonacci.`;
    }
}

console.log(isInFibonacci(22));
console.log(isInFibonacci(1));
console.log(isInFibonacci(7));
console.log(isInFibonacci(20));

//Questão 3:
try {
    var dados = fs.readFileSync('dados.json', 'utf8');
    var dadosLidos = JSON.parse(dados);
} catch (e) {
    console.log('Error:', e.stack);
}

function ordenaLista(lista) {
    return lista
        .filter(item => item.valor !== 0)
        .sort((a, b) => a.valor - b.valor);
}

function getMediaMensal(lista) {
    if (lista.length === 0) return;
    const soma = lista.reduce((acumulador, itemAtual) => acumulador + itemAtual.valor, 0);
    return soma / lista.length;
}

function getQntDiasMaiorQueMendiaMensal(media, lista) {
    let qntDias = 0;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].valor > media) qntDias++;
    }

    return qntDias;
}

const listaOrdenada = ordenaLista(dadosLidos);
const mediaMensal = getMediaMensal(dadosLidos);

const minimo = listaOrdenada[0];
const maximo = listaOrdenada[listaOrdenada.length - 1];

console.log(`O MENOR valor de faturamento foi de ${minimo.valor}, no dia ${minimo.dia}.`);
console.log(`O MAIOR valor de faturamento foi de ${maximo.valor}, no dia ${maximo.dia}.`);
console.log(`Quantidade de dias em que o faturamento diário foi superior à média mensal: ${getQntDiasMaiorQueMendiaMensal(mediaMensal, dadosLidos)}`)

//Questão 4: 
const faturamentoMensal = [
    { SP: 67836.43 },
    { RJ: 36678.66 },
    { MG: 29229.88 },
    { ES: 27165.48 },
    { Outros: 19849.53 }
];

function getTotal (lista) {
    return lista.reduce((acc, mes) => acc + Object.values(mes)[0], 0);
}

function getPorcentagemParticipacao(faturamentoMensal) {
    const total = getTotal(faturamentoMensal);

    const porcentagens = faturamentoMensal.map((mes) => {
        const valor = Object.values(mes)[0];
        const estado = Object.keys(mes)[0];
        const porcentagem = ((valor / total) * 100).toFixed(2) + "%";
        return { estado, porcentagem };
    });

    return porcentagens;
}

console.log("Porcentagens de participação: ", getPorcentagemParticipacao(faturamentoMensal));
