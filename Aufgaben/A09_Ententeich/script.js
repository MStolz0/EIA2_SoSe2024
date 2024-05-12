class Background {
    canvas;
    context;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw() {
        this.context.fillStyle = "#cfe4f7";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
class Mountains {
    canvas;
    context;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw() {
        // Berge zeichnen
        const mountainHeight = this.canvas.height * 0.75;
        const mountainWidth = this.canvas.width + 200;
        this.context.fillStyle = "#808080";
        this.context.beginPath();
        this.context.moveTo(0, this.canvas.height);
        this.context.lineTo(0, mountainHeight);
        this.context.lineTo(130, mountainHeight - 30); // Bergspitze
        this.context.lineTo(mountainWidth, this.canvas.height); // Endpunkt 
        this.context.closePath();
        this.context.fill();
        this.context.beginPath();
        this.context.moveTo(0, mountainHeight);
        this.context.lineTo(40, mountainHeight - 20); // Bergspitze
        this.context.lineTo(mountainWidth, this.canvas.height); // Endpunkt 
        this.context.closePath();
        this.context.fill();
        this.context.beginPath();
        this.context.moveTo(0, mountainHeight);
        this.context.lineTo(250, mountainHeight - 35); // Bergspitze
        this.context.lineTo(mountainWidth, this.canvas.height); // Endpunkt 
        this.context.closePath();
        this.context.fill();
    }
}
class Grassland {
    canvas;
    context;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw() {
        // Wiese zeichnen
        const height = this.canvas.height * 0.75;
        this.context.fillStyle = "#8bc34a";
        this.context.fillRect(0, height, this.canvas.width, this.canvas.height - height);
    }
}
class Pond {
    canvas;
    context;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw() {
        // Teich zeichnen
        const pondWidth = 80;
        const pondHeight = 30;
        const pondX = (this.canvas.width - pondWidth) / 2;
        const mountainHeight = this.canvas.height * 0.75;
        const pondY = mountainHeight + (this.canvas.height - mountainHeight - pondHeight) / 2;
        this.context.fillStyle = "#1976d2";
        this.context.fillRect(pondX, pondY, pondWidth, pondHeight);
    }
}
class Sun {
    canvas;
    context;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw() {
        // Sonne zeichnen
        const sunCenterX = this.canvas.width - 40;
        const sunCenterY = 40;
        const sunRadius = 20;
        this.context.beginPath();
        this.context.arc(sunCenterX, sunCenterY, sunRadius, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'yellow';
        this.context.fill();
    }
}
class Clouds {
    canvas;
    context;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw() {
        // Wolken zeichnen
        this.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.drawCloud(5, 5);
        this.drawCloud(50, 30);
        this.drawCloud(100, 10);
    }
    drawCloud(startX, startY) {
        const cloudWidth = 120;
        const cloudHeight = 30;
        const cornerRadius = 20;
        this.context.beginPath();
        this.context.moveTo(startX + cornerRadius, startY);
        this.context.arcTo(startX + cloudWidth, startY, startX + cloudWidth, startY + cornerRadius, cornerRadius);
        this.context.arcTo(startX + cloudWidth, startY + cloudHeight, startX + cloudWidth - cornerRadius, startY + cloudHeight, cornerRadius);
        this.context.arcTo(startX, startY + cloudHeight, startX, startY + cloudHeight - cornerRadius, cornerRadius);
        this.context.arcTo(startX, startY, startX + cornerRadius, startY, cornerRadius);
        this.context.closePath();
        this.context.fill();
    }
}
class Birds {
    canvas;
    context;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    draw(pondX, pondY) {
        // Vögel zeichnen
        // Vögel im Teich
        this.drawBird(pondX - 15, pondY, "#000000"); // Schwarzer Vogel
        this.drawBird(pondX + 15, pondY + 7, "#4CAF50"); // Grüner Vogel
        // Vögel in der Luft
        this.drawBird(this.canvas.width * 0.2, this.canvas.height * 0.1, "#FF5722"); // Orangener Vogel
        this.drawBird(this.canvas.width * 0.6, this.canvas.height * 0.15, "#9C27B0"); // Lila Vogel
        // Vögel auf der Wiese
        const mountainHeight = this.canvas.height * 0.75;
        this.drawBird(this.canvas.width * 0.3, mountainHeight + 15, "#FFEB3B"); // Gelber Vogel
        this.drawBird(this.canvas.width * 0.7, mountainHeight + 22, "#FF9800"); // Hell Oranger Vogel
    }
    drawBird(x, y, color) {
        // Torso
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 15, 10);
        // Flügel
        this.context.fillStyle = "#757575";
        this.context.fillRect(x + 7, y - 1, 15, 7);
        // Kopf
        this.context.fillStyle = color;
        this.context.fillRect(x - 3, y - 6, 6, 6);
        // Schnabel
        this.context.fillStyle = "orange";
        this.context.fillRect(x + 3, y - 3, 4, 2);
        // Beine
        this.context.fillStyle = "#757575";
        this.context.fillRect(x + 7, y + 10, 1, 5);
        this.context.fillRect(x + 12, y + 10, 1, 5);
    }
}
class Sky {
    canvas;
    context;
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.draw();
    }
    draw() {
        const background = new Background(this.canvas, this.context);
        background.draw();
        const mountains = new Mountains(this.canvas, this.context);
        mountains.draw();
        const grassland = new Grassland(this.canvas, this.context);
        grassland.draw();
        const pond = new Pond(this.canvas, this.context);
        pond.draw();
        const sun = new Sun(this.canvas, this.context);
        sun.draw();
        const clouds = new Clouds(this.canvas, this.context);
        clouds.draw();
        const height = this.canvas.height * 0.75;
        const birds = new Birds(this.canvas, this.context);
        birds.draw((this.canvas.width - 80) / 2, height + (this.canvas.height - height - 30) / 2);
    }
}
const sky = new Sky('canvas');
//# sourceMappingURL=script.js.map