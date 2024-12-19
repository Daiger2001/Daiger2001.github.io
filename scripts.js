// Lista de preguntas y respuestas
const levels = {
    beginner: [
        {
            question: "¿Qué es HTML?",
            options: [
                "Un lenguaje de procesamiento de texto.",
                "Un editor de texto.",
                "Un lenguaje de programación que se utiliza para estructurar y mostrar el contenido de una página web.",
                "Un tipo de servidor."
            ],
            correct: 2
        },
        {
            question: "¿Qué significa CSS?",
            options: [
                "Creative Style System.",
                "Cascading Style Sheets.",
                "Computer Style Script.",
                "Creative Script System."
            ],
            correct: 1
        },
        {
            question: "¿Cuál es la función de un navegador web?",
            options: [
                "Editar imágenes.",
                "Procesar hojas de cálculo.",
                "Interpretar y mostrar páginas web.",
                "Diseñar bases de datos."
            ],
            correct: 2
        },
        {
            question: "¿Qué etiqueta HTML se usa para definir un enlace?",
            options: [
                "&lt;a&gt;", // Respuesta correcta
                "&lt;link&gt;",
                "&lt;href&gt;",
                "&lt;src&gt;"
            ],
            correct: 0
        },
        {
            question: "¿Qué hace la etiqueta &lt;title&gt; en un documento HTML?",
            options: [
                "Define el título de la página web que aparece en la barra del navegador.", // Respuesta correcta
                "Define el encabezado principal.",
                "Define una imagen.",
                "Define un párrafo."
            ],
            correct: 0
        }
    ],
    intermediate: [
        {
            question: "¿Qué es JavaScript?",
            options: [
                "Un framework de CSS.",
                "Un lenguaje de programación usado para la web.",
                "Una base de datos.",
                "Un editor de texto."
            ],
            correct: 1
        },
        {
            question: "¿Qué función tiene el atributo 'alt' en las imágenes HTML?",
            options: [
                "Agregar un enlace a la imagen.",
                "Proporcionar texto alternativo si la imagen no se carga.",
                "Definir el tamaño de la imagen.",
                "Cambiar el color de la imagen."
            ],
            correct: 1
        },
        {
            question: "¿Qué es una función en JavaScript?",
            options: [
                "Una variable que almacena un número.",
                "Un bloque de código que realiza una tarea específica.",
                "Un estilo CSS aplicado al HTML.",
                "Un archivo adicional del proyecto."
            ],
            correct: 1
        },
        {
            question: "¿Cuál es la salida de console.log(2 + '2') en JavaScript?",
            options: [
                "4",
                "NaN",
                "22",
                "Error"
            ],
            correct: 2
        },
        {
            question: "¿Cuál es la diferencia entre '==' y '===' en JavaScript?",
            options: [
                "'==' compara valor y tipo, '===' solo compara valor.",
                "'==' compara solo valor, '===' compara valor y tipo.",
                "No hay diferencia entre ellos.",
                "'==' compara cadenas, '===' compara números."
            ],
            correct: 1
        }
    ],
    advanced: [
        {
            question: "¿Qué es una API?",
            options: [
                "Un servidor web.",
                "Un lenguaje de marcado.",
                "Un conjunto de funciones y procedimientos para interactuar con software.",
                "Una biblioteca de CSS."
            ],
            correct: 2
        },
        {
            question: "¿Qué significa DOM en JavaScript?",
            options: [
                "Document Object Model.",
                "Dynamic Object Method.",
                "Data Object Model.",
                "Document Oriented Mode."
            ],
            correct: 0
        },
        {
            question: "¿Cuál es la diferencia entre 'var', 'let' y 'const' en JavaScript?",
            options: [
                "'var' tiene alcance global o de función, 'let' y 'const' tienen alcance de bloque.",
                "'var' y 'let' son iguales, 'const' define constantes.",
                "'let' es una constante, 'const' es una variable.",
                "No hay diferencia entre ellos."
            ],
            correct: 0
        },
        {
            question: "¿Qué hace el método 'map()' en JavaScript?",
            options: [
                "Filtra elementos de un array.",
                "Transforma cada elemento de un array y devuelve un nuevo array.",
                "Ordena los elementos de un array.",
                "Encuentra el índice de un elemento en un array."
            ],
            correct: 1
        },
        {
            question: "¿Qué es un callback en JavaScript?",
            options: [
                "Una función que se ejecuta después de otra función.",
                "Un error en el código.",
                "Una función que devuelve siempre un número.",
                "Una variable global."
            ],
            correct: 0
        }
    ]
};
let selectedLevel = null; // Nivel seleccionado
let currentQuestionIndex = 0; // Índice de la pregunta actual
let totalScore = 0; // Puntaje total
const results = []; // Array para almacenar los resultados de cada pregunta
let timer; // Variable para el temporizador

// Mostrar el menú inicial
function showMenu() {
    const container = document.getElementById("menu-container");

    container.innerHTML = `
        <div class="level-selection">
            <h2>Selecciona tu nivel</h2>
            <button class="level-button" onclick="startGame('beginner')">Principiante</button>
            <button class="level-button" onclick="startGame('intermediate')">Intermedio</button>
            <button class="level-button" onclick="startGame('advanced')">Avanzado</button>
        </div>
    `;
}


// Iniciar el juego
function startGame(level) {
    selectedLevel = levels[level]; // Cargar preguntas del nivel seleccionado
    currentQuestionIndex = 0;
    totalScore = 0;
    results.length = 0; // Vaciar los resultados
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    loadQuestion(); // Cargar la primera pregunta
}

// Función para cargar la pregunta actual
function loadQuestion() {
    const container = document.getElementById("question-container");
    const currentQuestion = selectedLevel[currentQuestionIndex];

    // Reiniciar el temporizador
    clearInterval(timer);

    // Generar dinámicamente el contenido de la pregunta y las opciones
    container.innerHTML = `
        <h2>Pregunta ${currentQuestionIndex + 1} de ${selectedLevel.length}</h2>
        <div id="timer" class="timer"></div> <!-- Temporizador -->
        <h3>${currentQuestion.question}</h3>
        <form>
            <div class="answers-container">
                ${currentQuestion.options.map((option, index) => `
                    <div class="answer-box">
                        <input type="radio" name="respuesta" id="opcion${index}" value="${index}">
                        <label for="opcion${index}">${option}</label>
                    </div>
                `).join("")}
            </div>
        </form>
    `;

    // Agregar eventos de respuesta
    const options = container.querySelectorAll("input");
    options.forEach((option, index) => {
        option.addEventListener("change", () => {
            let points = 0;
            if (index === currentQuestion.correct) {
                points = 20;
                totalScore += 20;
            }

            results.push({
                questionNumber: currentQuestionIndex + 1,
                score: points
            });

            clearInterval(timer); // Detener el temporizador

            currentQuestionIndex++;
            if (currentQuestionIndex < selectedLevel.length) {
                loadQuestion(); // Cargar la próxima pregunta
            } else {
                showFinalScore(); // Mostrar el resultado final
            }
        });
    });

    // Iniciar el temporizador
    startTimer();
}
const playerName = localStorage.getItem("playerName") || "Jugador";

// Mostrar el puntaje final
function showFinalScore() {
    const container = document.getElementById("question-container");

    // Recuperar el nombre del jugador desde localStorage
    const playerName = localStorage.getItem("playerName") || "Jugador";

    // Generar filas de la tabla con los resultados
    let rows = results.map(result => `
        <tr>
            <td>Pregunta ${result.questionNumber}</td>
            <td>${result.score} puntos</td>
        </tr>
    `).join("");

    // Mostrar el GIF correspondiente según el puntaje
    const gifNormal = document.getElementById("gif-normal");
    const gifCorrect = document.getElementById("gif-correct");
    const gifIncorrect = document.getElementById("gif-incorrect");

    gifNormal.style.display = 'none'; // Ocultar el GIF normal
    if (totalScore > 60) {
        gifCorrect.style.display = 'block'; // Mostrar el GIF correcto
        gifIncorrect.style.display = 'none';
    } else if (totalScore <= 50) {
        gifCorrect.style.display = 'none';
        gifIncorrect.style.display = 'block'; // Mostrar el GIF incorrecto
    }

    // Generar el contenido del puntaje final con el nombre del jugador
    container.innerHTML = `
        <h2>¡Trivia completada!</h2>
        <p>¡${playerName}!</p>
        <p>Tu puntaje final es: <strong>${totalScore}</strong> de ${selectedLevel.length * 20}</p>
        <table class="final-score-table">
            <thead>
                <tr>
                    <th>Pregunta</th>
                    <th>Puntaje</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        <button onclick="restartTrivia()">Volver al Menú</button>
    `;
}


function restartTrivia() {
    document.getElementById("menu-container").style.display = "block";
    document.getElementById("question-container").style.display = "none";

    // Restaurar el GIF normal al regresar al menú
    const gifNormal = document.getElementById("gif-normal");
    const gifCorrect = document.getElementById("gif-correct");
    const gifIncorrect = document.getElementById("gif-incorrect");

    gifNormal.style.display = 'block'; // Mostrar el GIF normal
    gifCorrect.style.display = 'none';
    gifIncorrect.style.display = 'none';

    showMenu();
}


// Mostrar el menú inicial
showMenu();

// Función para iniciar el temporizador
function startTimer() {
    let timeLeft = 30; // Tiempo en segundos para cada pregunta
    const timerElement = document.getElementById("timer");

    // Actualizar el temporizador cada segundo
    timer = setInterval(() => {
        timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;

        // Si el tiempo se acaba, se detiene el temporizador y se pasa a la siguiente pregunta
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < selectedLevel.length) {
                loadQuestion(); // Cargar la próxima pregunta
            } else {
                showFinalScore(); // Mostrar el resultado final
            }
        }
        timeLeft--; // Decrementar el tiempo
    }, 1000); // Ejecutar cada 1 segundo
}

function loadQuestion() {
    const container = document.getElementById("question-container");
    const currentQuestion = selectedLevel[currentQuestionIndex];

    // Reiniciar el temporizador
    clearInterval(timer);

    // Generar dinámicamente el contenido de la pregunta y las opciones
    container.innerHTML = `
        <h2>Pregunta ${currentQuestionIndex + 1} de ${selectedLevel.length}</h2>
        <div id="timer" class="timer"></div> <!-- Temporizador -->
        <h3>${currentQuestion.question}</h3>
        <form>
            <div class="answers-container">
                ${currentQuestion.options.map((option, index) => `
                    <div class="answer-box">
                        <input type="radio" name="respuesta" id="opcion${index}" value="${index}">
                        <label for="opcion${index}">${option}</label>
                    </div>
                `).join("")}
            </div>
        </form>
        <button id="fifty-fifty-btn" onclick="useFiftyFifty()" ${usedFiftyFifty ? 'disabled' : ''}>50/50</button>
    `;

    // Agregar eventos de respuesta
    const options = container.querySelectorAll("input");
    options.forEach((option, index) => {
        option.addEventListener("change", () => {
            let points = 0;
            if (index === currentQuestion.correct) {
                points = 20;
                totalScore += 20;
            }

            results.push({
                questionNumber: currentQuestionIndex + 1,
                score: points
            });

            clearInterval(timer); // Detener el temporizador

            currentQuestionIndex++;
            if (currentQuestionIndex < selectedLevel.length) {
                loadQuestion(); // Cargar la próxima pregunta
            } else {
                showFinalScore(); // Mostrar el resultado final
            }
        });
    });

    // Iniciar el temporizador
    startTimer();
}
// Variable para saber si ya se usó el 50/50
let usedFiftyFifty = false;

// Función para usar el 50/50
function useFiftyFifty() {
    if (usedFiftyFifty) return; // Si ya se usó, no hacer nada

    const currentQuestion = selectedLevel[currentQuestionIndex];
    const incorrectOptions = [];

    // Encontrar las opciones incorrectas
    currentQuestion.options.forEach((option, index) => {
        if (index !== currentQuestion.correct) {
            incorrectOptions.push(index);
        }
    });

    // Elegir dos respuestas incorrectas al azar
    const randomIncorrectIndexes = [];
    while (randomIncorrectIndexes.length < 2) {
        const randomIndex = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        if (!randomIncorrectIndexes.includes(randomIndex)) {
            randomIncorrectIndexes.push(randomIndex);
        }
    }

    // Eliminar dos opciones incorrectas
    randomIncorrectIndexes.forEach(index => {
        const answerBox = document.getElementById(`opcion${index}`).parentElement;
        answerBox.style.display = 'none'; // Ocultar la opción incorrecta
    });

    usedFiftyFifty = true; // Marcar que ya se usó
    document.getElementById("fifty-fifty-btn").disabled = true; // Deshabilitar el botón 50/50
}
function startGame(level) {
    selectedLevel = levels[level]; // Cargar preguntas del nivel seleccionado
    currentQuestionIndex = 0;
    totalScore = 0;
    results.length = 0; // Vaciar los resultados
    usedFiftyFifty = false; // Reiniciar el uso del 50/50
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    loadQuestion(); // Cargar la primera pregunta
}


// Generar la pregunta actual y sus opciones
function loadQuestion() {
    const container = document.getElementById("question-container");
    const currentQuestion = selectedLevel[currentQuestionIndex];

    // Reiniciar el temporizador
    clearInterval(timer);

    // Generar dinámicamente el contenido de la pregunta
    container.innerHTML = `
        <h2>Pregunta ${currentQuestionIndex + 1} de ${selectedLevel.length}</h2>
        <div id="timer" class="timer"></div>
        <h3>${currentQuestion.question}</h3>
        <form>
            <div class="answers-container">
                ${currentQuestion.options.map((option, index) => `
                    <div class="answer-box">
                        <input type="radio" name="respuesta" id="opcion${index}" value="${index}">
                        <label for="opcion${index}">${option}</label>
                    </div>
                `).join("")}
            </div>
        </form>
        <div class="button-container">
            <button id="fifty-fifty-btn" class="fifty-fifty-button" onclick="useFiftyFifty()" ${usedFiftyFifty ? 'disabled' : ''}>50/50</button>
            <button id="listen-btn" class="listen-button">Escuchar Pregunta</button>
        </div>
    `;

    // Configurar eventos para las respuestas
    const options = container.querySelectorAll("input[name='respuesta']");
    options.forEach(option => {
        option.addEventListener("change", () => {
            const selectedValue = parseInt(option.value, 10);
            checkAnswer(selectedValue); // Validar la respuesta seleccionada
        });
    });

    // Configurar el botón de escuchar
    const listenButton = document.getElementById("listen-btn");
    listenButton.addEventListener("click", () => {
        // Obtener solo las opciones visibles después de usar el 50/50
        const visibleOptions = Array.from(container.querySelectorAll(".answer-box"))
            .filter(box => box.style.display !== "none") // Filtrar las opciones visibles
            .map(box => box.querySelector("label").textContent); // Obtener el texto de las visibles

        const textToSpeak = `${currentQuestion.question}. Las opciones visibles son: ${visibleOptions.join(', ')}`;
        speakText(textToSpeak); // Leer la pregunta y opciones visibles
    });

    // Iniciar el temporizador
    startTimer();
}

// Verificar la respuesta seleccionada
function checkAnswer(selectedValue) {
    const currentQuestion = selectedLevel[currentQuestionIndex];

    // Control de GIFs
    const gifNormal = document.getElementById("gif-normal");
    const gifCorrect = document.getElementById("gif-correct");
    const gifIncorrect = document.getElementById("gif-incorrect");

    gifNormal.style.display = 'none';
    gifCorrect.style.display = 'none';
    gifIncorrect.style.display = 'none';

    if (selectedValue === currentQuestion.correct) {
        gifCorrect.style.display = 'block'; // Mostrar GIF correcto
    } else {
        gifIncorrect.style.display = 'block'; // Mostrar GIF incorrecto
    }

    // Pausar el temporizador
    clearInterval(timer);

    // Actualizar el puntaje
    let points = selectedValue === currentQuestion.correct ? 20 : 0;
    totalScore += points;
    results.push({
        questionNumber: currentQuestionIndex + 1,
        score: points
    });

    // Avanzar a la siguiente pregunta o mostrar los resultados finales
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedLevel.length) {
        setTimeout(loadQuestion, 1000); // Esperar 1 segundo antes de cargar la siguiente pregunta
    } else {
        setTimeout(showFinalScore, 1000); // Mostrar los resultados finales
    }
}

// Usar la función 50/50 para eliminar dos opciones incorrectas
function useFiftyFifty() {
    if (usedFiftyFifty) return;

    const currentQuestion = selectedLevel[currentQuestionIndex];
    const incorrectOptions = [];

    // Identificar las opciones incorrectas
    currentQuestion.options.forEach((option, index) => {
        if (index !== currentQuestion.correct) {
            incorrectOptions.push(index);
        }
    });

    // Seleccionar dos opciones incorrectas al azar
    const randomIncorrectIndexes = [];
    while (randomIncorrectIndexes.length < 2) {
        const randomIndex = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        if (!randomIncorrectIndexes.includes(randomIndex)) {
            randomIncorrectIndexes.push(randomIndex);
        }
    }

    // Ocultar las opciones seleccionadas
    randomIncorrectIndexes.forEach(index => {
        const answerBox = document.getElementById(`opcion${index}`).parentElement;
        answerBox.style.display = 'none'; // Ocultar la opción incorrecta
    });

    usedFiftyFifty = true; // Marcar que el botón ya fue usado
    document.getElementById("fifty-fifty-btn").disabled = true; // Deshabilitar el botón 50/50
}

// Función para leer texto en voz alta
function speakText(text) {
    window.speechSynthesis.cancel(); // Detener cualquier síntesis en curso

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Idioma español
    utterance.rate = 1; // Velocidad normal
    utterance.pitch = 1; // Tonalidad normal
    window.speechSynthesis.speak(utterance); // Reproducir el texto
}

let fiftyFiftyUsed = false; // Controla si el 50/50 fue usado en el nivel actual

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");

    // Evita crear controles duplicados
    if (!document.getElementById("volume-control-container")) {
        // Establece el volumen inicial al mínimo
        audio.volume = 0.1;

        // Crear el contenedor para el control de volumen
        const volumeContainer = document.createElement("div");
        volumeContainer.id = "volume-control-container";
        volumeContainer.style.position = "fixed";
        volumeContainer.style.bottom = "60px"; // Ajuste para separarlo del botón
        volumeContainer.style.left = "10px";
        volumeContainer.style.display = "flex";
        volumeContainer.style.alignItems = "center";
        volumeContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        volumeContainer.style.padding = "10px";
        volumeContainer.style.borderRadius = "10px";
        volumeContainer.style.zIndex = "1000";

        // Agregar etiqueta y slider
        volumeContainer.innerHTML = `
            <label style="color: #ffd700; font-weight: bold; margin-right: 10px;">Volumen:</label>
            <input id="volume-control" type="range" min="0" max="1" step="0.01" value="${audio.volume}" style="width: 100px;">
        `;
        document.body.appendChild(volumeContainer);

        // Evento para ajustar el volumen
        const volumeControl = document.getElementById("volume-control");
        volumeControl.addEventListener("input", (event) => {
            audio.volume = event.target.value;
        });
    }

    // Evita crear botones duplicados
    if (!document.querySelector(".music-control-button")) {
        const musicButton = document.createElement("button");
        musicButton.className = "music-control-button";
        musicButton.textContent = "Pausar Música";
        musicButton.style.position = "fixed";
        musicButton.style.bottom = "10px";
        musicButton.style.left = "10px";
        musicButton.style.padding = "10px 20px";
        musicButton.style.backgroundColor = "#ffd700";
        musicButton.style.color = "#002b5b";
        musicButton.style.border = "none";
        musicButton.style.borderRadius = "8px";
        musicButton.style.cursor = "pointer";
        musicButton.style.fontWeight = "bold";
        musicButton.style.zIndex = "1000";
        document.body.appendChild(musicButton);

        // Alternar la música al hacer clic
        musicButton.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                musicButton.textContent = "Pausar Música";
            } else {
                audio.pause();
                musicButton.textContent = "Reproducir Música";
            }
        });
    }

    // Intentar reproducir automáticamente
    audio.play().catch(() => {
        console.log("El navegador bloqueó la reproducción automática.");
        const alertDiv = document.createElement("div");
        alertDiv.textContent = "Haz clic en cualquier lugar para activar la música.";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "50%";
        alertDiv.style.left = "50%";
        alertDiv.style.transform = "translate(-50%, -50%)";
        alertDiv.style.backgroundColor = "#ffd700";
        alertDiv.style.padding = "20px";
        alertDiv.style.borderRadius = "10px";
        alertDiv.style.zIndex = "1000";
        alertDiv.style.fontSize = "1.2rem";
        document.body.appendChild(alertDiv);

        document.body.addEventListener("click", () => {
            audio.play().then(() => document.body.removeChild(alertDiv));
        }, { once: true });
    });
});

const modal = document.getElementById("credits-modal");
const openButton = document.getElementById("open-credits");
const closeButton = document.getElementById("close-credits");

openButton.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
