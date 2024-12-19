const playerName = localStorage.getItem("playerName") || "Jugador";
document.getElementById("menu-container").innerHTML = `
    <h2>Bienvenido, ${playerName}</h2>
    <h2>Elige tu nivel</h2>
    <button onclick="startGame('beginner')">Principiante</button>
    <button onclick="startGame('intermediate')">Intermedio</button>
    <button onclick="startGame('advanced')">Avanzado</button>
`;
