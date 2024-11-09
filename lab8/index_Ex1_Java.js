
const mudarFrase = document.getElementById('mudar-frase');

mudarFrase.addEventListener('mouseover', () => {
    mudarFrase.textContent = "Obrigado por passares!";
  });
  
  mudarFrase.addEventListener('mouseout', () => {
    mudarFrase.textContent = "Passe por aqui!";
  });


  const texto = document.getElementById('texto');

 
  document.querySelectorAll('button[data-color]').forEach((button) => {
      button.addEventListener('click', () => {
          const cor = button.dataset.color; 
          texto.style.color = cor; 
      });
  });
  
    

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

document.getElementById('cor-input').addEventListener('change', function() {
    const corInput = this.value;
    if (corInput) {
        document.body.style.backgroundColor = corInput;
    }
})



let count = parseInt(localStorage.getItem('count')) || 0; 
const botaoConta = document.querySelector('#conta');
const elementoContador = document.querySelector('#count');

elementoContador.textContent = `${count}`;

botaoConta.addEventListener('click', function() {
    count++;
    elementoContador.textContent = `${count}`;
    localStorage.setItem('count', count); 
});



document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    
    const nome = document.querySelector('#nome').value;
    const idade = document.querySelector('#idade').value;
    
    const mensagem = `Olá, o/a ${nome} tem ${idade} anos!`;
    
    document.querySelector('#mensagem').textContent = mensagem;
};

document.addEventListener('DOMContentLoaded', () => {
    let counter = parseInt(localStorage.getItem('automaticCounter')) || 0;
    function count() {
        counter++; 
        document.getElementById("contador").textContent = counter; 
        localStorage.setItem('automaticCounter', counter);
    }
    setInterval(count, 1000);
});
