
const mudarFrase = document.getElementById('mudar-frase');

mudarFrase.addEventListener('mouseover', () => {
    mudarFrase.textContent = "Obrigado por passares!";
  });
  
  mudarFrase.addEventListener('mouseout', () => {
    mudarFrase.textContent = "Passe por aqui!";
  });


const mudarCor = document.getElementById('mudar-cor');
const texto = document.getElementById('texto');

function mudarCorTexto(cor) {
    texto.style.color = cor;
}

document.getElementById('red').addEventListener('click', () => mudarCorTexto('red'));
document.getElementById('green').addEventListener('click', () => mudarCorTexto('green'));
document.getElementById('blue').addEventListener('click', () => mudarCorTexto('blue'));
    

const inputBox = document.getElementById('box-texto');

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


inputBox.addEventListener('input', function() {
    if (this.value.length > 0) {
        this.style.backgroundColor = getRandomColor(); 
    } else {
        this.style.backgroundColor = ''; 
    }
});
