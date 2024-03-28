document.addEventListener('DOMContentLoaded', function () {
    // Variables de los elementos del DOM
    const playerChoiceDisplay = document.getElementById('player-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const partialSumDisplay = document.getElementById('partial-sum');
    const timerDisplay = document.getElementById('timer');
    const numberButtons = document.querySelectorAll('.number-btn');
    const jugarButton = document.getElementById('jugar-btn');
    const contenedorImagen = document.getElementById('contenedor_imagen');
    const mostrar = document.getElementById('instrucciones');
    let partialSum = 0;
    let isPlayerTurn = false;
    let timeLeft = 12;
    let timer;

    // Función para leer las instrucciones del juego
    mostrar.addEventListener('click', function() {
        var image = document.getElementById('manual');
        if (image.classList.contains('hidden')) {
            image.classList.remove('hidden');
            mostrar.innerHTML = 'CERRAR';
        } else {
            image.classList.add('hidden');
            mostrar.innerHTML = 'INSTRUCCIONES';
           
        }
    });

    // Función para iniciar el temporizador del jugador
    function startPlayerTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Tiempo restante: ${timeLeft} s`;
            if (timeLeft === 0) {
                clearInterval(timer);
                alert('¡Se acabó el tiempo! Has perdido la partida.');
                resetGame();
            }
        }, 1000);
    }


    // Función para reiniciar el temporizador del jugador
    function resetPlayerTimer() {
        clearInterval(timer);
        timeLeft = 12;
        timerDisplay.textContent = `Tiempo restante: ${timeLeft} s`;
        startPlayerTimer();
    }

   

    // Función para actualizar la suma parcial en el DOM
    function updatePartialSum() {
        partialSumDisplay.textContent = `Suma parcial: ${partialSum}`;
    }

    // Función para mostrar la imagen correspondiente al botón presionado por el jugador
    function mostrarImagen(numeroBoton) {
        // Crear y mostrar la imagen correspondiente al número seleccionado por el jugador
        const imagen = document.createElement('img');
        imagen.src = `/imagenes/bitmap${numeroBoton}.png`;
        imagen.alt = 'imagen';
        imagen.style.width = '65px';
        contenedorImagen.appendChild(imagen);

        // Crear y mostrar la imagen "plus.png" después de cada imagen de número
        const plus = document.createElement('img');
        plus.src = '/imagenes/plus.png';
        plus.alt = 'plus';
        plus.style.width = '30px'; // Ajusta el tamaño según tus necesidades
        contenedorImagen.appendChild(plus);
    }

    // Función para el turno de la computadora
    function computerTurn() {
        setTimeout(() => { // Agrega un retraso de un segundo antes de mostrar la imagen del computador
            if (!isPlayerTurn) {
                const computerNumber = Math.floor(Math.random() * 6) + 1;
                partialSum += computerNumber;
                updatePartialSum();
                computerChoiceDisplay.textContent = `Elección computadora: ${computerNumber}`;
                mostrarImagen(computerNumber);
                checkEndGame();
                isPlayerTurn = true;
            }
        }, 1000); // Retraso de un segundo en milisegundos
    }

    // Función para verificar el final del juego
    function checkEndGame() {
        if (partialSum >= 30) {
            let winner;
            if (isPlayerTurn) {
                winner = 'Jugador';
            } else {
                winner = 'Computadora';
            }
            alert(`${winner} ha ganado!`);
            resetGame();
        }
    }

    // Función para reiniciar el juego
    function resetGame() {
        clearInterval(timer);
        partialSum = 0;
        timeLeft = 12;
        partialSumDisplay.textContent = `Suma parcial: ${partialSum}`;
        playerChoiceDisplay.textContent = 'Elección jugador: ';
        computerChoiceDisplay.textContent = 'Elección computadora: ';
        timerDisplay.textContent = `Tiempo restante: ${timeLeft} s`;
        jugarButton.disabled = false;
        contenedorImagen.innerHTML = ''; // Limpiar las imágenes mostradas
    }

  

    // Evento click para el botón "Jugar"
    jugarButton.addEventListener('click', function() {
        isPlayerTurn = true;
        startPlayerTimer();
        jugarButton.disabled = true;
    });

    // Evento click para cada botón de número
    numberButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (isPlayerTurn) {
                const number = parseInt(button.value);
                partialSum += number;
                updatePartialSum();
                playerChoiceDisplay.textContent = `Elección jugador: ${number}`;
                mostrarImagen(number);
                checkEndGame();
                isPlayerTurn = false;
                resetPlayerTimer();
                computerTurn();
            }
        });
    });
});
