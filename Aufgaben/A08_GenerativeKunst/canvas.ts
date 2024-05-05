// Definiere die Breite und Höhe des Canvas-Elements
const canvasWidth = 800;
const canvasHeight = 600;

// Erfasse die Breite und Höhe des Fensters
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Berechne den Abstand zum Rand für die zentrierte Positionierung
const marginLeft = (screenWidth - canvasWidth) / 2;
const marginTop = (screenHeight - canvasHeight) / 2;

// Erstelle das Canvas-Element und füge es zum HTML-Dokument hinzu
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.position = 'absolute';
canvas.style.left = `${marginLeft}px`; // Zentriere horizontal
canvas.style.top = `${marginTop}px`; // Zentriere vertikal
canvas.style.zIndex = '1'; // Stelle sicher, dass das Canvas unter dem Text liegt
document.body.appendChild(canvas);

// Hole den 2D-Kontext des Canvas
const ctx = canvas.getContext('2d');

// Funktion zum Zeichnen eines zufälligen Polygonmusters
function drawRandomPolygons() {
    // Definiere die Anzahl der Polygone
    const numPolygons = 50;

    // Zeichne zufällige Polygone
    for (let i = 0; i < numPolygons; i++) {
        // Generiere eine zufällige Anzahl von Eckpunkten für jedes Polygon (3 bis 10)
        const numPoints = Math.floor(Math.random() * 8) + 3;
        ctx.beginPath();

        // Setze den Startpunkt
        const startX = Math.random() * canvasWidth;
        const startY = Math.random() * canvasHeight;
        ctx.moveTo(startX, startY);

        // Zeichne die Seiten des Polygons
        for (let j = 1; j < numPoints; j++) {
            const x = Math.random() * canvasWidth;
            const y = Math.random() * canvasHeight;
            ctx.lineTo(x, y);
        }

        // Schließe das Polygon
        ctx.closePath();

        // Wähle eine zufällige Farbe für jedes Polygon
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;

        // Fülle das Polygon mit der ausgewählten Farbe
        ctx.fill();
    }
}

// Funktion zum Starten der Kunstgenerierung
function generateArt() {
    // Lösche den vorherigen Inhalt des Canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Zeichne das zufällige Polygonmuster
    drawRandomPolygons();
}

// Generiere die Kunst beim Laden der Seite
generateArt();

// Füge einen Eventlistener hinzu, um bei einem Klick die Kunst neu zu generieren
canvas.addEventListener('click', generateArt);

