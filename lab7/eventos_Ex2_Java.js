const images = document.querySelectorAll('.gallery-img');
const message = document.getElementById('message');
const form = document.getElementById('form');
const textInput = document.getElementById('text-input');

// Eventos de Rato
images.forEach(img => {
    img.addEventListener('click', () => {
        img.style.border = '5px solid blue';
        message.textContent = 'Clicaste na Imagem';
    });
    img.addEventListener('dblclick', () => {
        img.style.border = '5px solid red';
        message.textContent = 'Fizeste duplo clique na imagem!';
    });
    img.addEventListener('mouseover', () => {
        img.classList.add('highlight');
    });
    img.addEventListener('mouseout', () => {
        img.classList.remove('highlight');
    });
    img.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        message.textContent = `Mouse na posição: (${x}, ${y})`;
    });
});

// Eventos de Teclado
textInput.addEventListener('keydown', () => {
    message.textContent = 'Estás a escrever';
});
textInput.addEventListener('keyup', () => {
    message.textContent = 'Não estas a escrever';
});

// Eventos de Formulário
form.addEventListener('change', () => {
    message.textContent = 'O valor do campo foi alterado!';
});
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir o envio do formulário
    const inputValue = textInput.value;
    message.textContent = `Enviaste: ${inputValue}`;
    textInput.value = ''; // Limpar o campo de entrada
});
