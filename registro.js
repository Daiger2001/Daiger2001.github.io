document.getElementById("player-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const playerName = document.getElementById("player-name").value;

    // Guardar el nombre del jugador en localStorage
    localStorage.setItem("playerName", playerName);

    // Redirigir a las instrucciones
    window.location.href = "instrucciones.html";
});
