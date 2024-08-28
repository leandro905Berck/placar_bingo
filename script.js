document.addEventListener('DOMContentLoaded', () => {
    const letraNumeros = {
        B: Array.from({ length: 15 }, (_, i) => i + 1),
        I: Array.from({ length: 15 }, (_, i) => i + 16),
        N: Array.from({ length: 15 }, (_, i) => i + 31),
        G: Array.from({ length: 15 }, (_, i) => i + 46),
        O: Array.from({ length: 15 }, (_, i) => i + 61)
    };

    let sorteio = [];
    const letraNumeroDisplay = document.getElementById('letra-numero');
    const cartelaDiv = document.getElementById('cartela-numeros');
    const inputNumero = document.getElementById('input-numero');
    const sortearBtn = document.getElementById('sortear-btn');
    const adicionarBtn = document.getElementById('adicionar-btn');

    function gerarCartela() {
        cartelaDiv.innerHTML = '';
        for (const [letra, numeros] of Object.entries(letraNumeros)) {
            numeros.forEach(numero => {
                const div = document.createElement('div');
                div.className = 'numero';
                div.textContent = `${letra}${numero}`;
                cartelaDiv.appendChild(div);
            });
        }
    }

    function sortearNumero() {
        const letras = Object.keys(letraNumeros);
        if (sorteio.length === letras.length * 15) {
            alert('Todos os números foram sorteados!');
            return;
        }

        let letra;
        let numero;

        do {
            letra = letras[Math.floor(Math.random() * letras.length)];
            numero = letraNumeros[letra][Math.floor(Math.random() * letraNumeros[letra].length)];
        } while (sorteio.includes(`${letra}${numero}`));

        sorteio.push(`${letra}${numero}`);
        letraNumeroDisplay.textContent = `Letra: ${letra}, Número: ${numero}`;

        const numeroDivs = document.querySelectorAll('.numero');
        numeroDivs.forEach(div => {
            if (div.textContent === `${letra}${numero}`) {
                div.classList.add('marked');
            }
        });
    }

    function adicionarNumeroManual() {
        const numero = parseInt(inputNumero.value, 10);

        if (isNaN(numero) || numero < 1 || numero > 75) {
            alert('Número inválido! Insira um número entre 1 e 75.');
            return;
        }

        let letra;
        if (numero <= 15) letra = 'B';
        else if (numero <= 30) letra = 'I';
        else if (numero <= 45) letra = 'N';
        else if (numero <= 60) letra = 'G';
        else letra = 'O';

        if (sorteio.includes(`${letra}${numero}`)) {
            alert('Número já sorteado!');
            return;
        }

        sorteio.push(`${letra}${numero}`);
        letraNumeroDisplay.textContent = `Letra: ${letra}, Número: ${numero}`;

        const numeroDivs = document.querySelectorAll('.numero');
        numeroDivs.forEach(div => {
            if (div.textContent === `${letra}${numero}`) {
                div.classList.add('marked');
            }
        });

        inputNumero.value = '';
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            adicionarNumeroManual();
        }
    }

    sortearBtn.addEventListener('click', sortearNumero);
    adicionarBtn.addEventListener('click', adicionarNumeroManual);
    inputNumero.addEventListener('keypress', handleKeyPress); // Adiciona o listener para o evento keypress

    gerarCartela();
});
