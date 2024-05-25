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
class Mountain {
    canvas;
    context;
    x;
    constructor(canvas, context, x) {
        this.canvas = canvas;
        this.context = context;
        this.x = x;
    }
    draw() {
        const mountainHeight = this.canvas.height * 0.75;
        const mountainWidth = this.canvas.width + 200;
        this.context.fillStyle = "#808080";
        this.context.beginPath();
        this.context.moveTo(this.x, this.canvas.height);
        this.context.lineTo(this.x, mountainHeight);
        this.context.lineTo(this.x + 130, mountainHeight - 30);
        this.context.lineTo(this.x + mountainWidth, this.canvas.height);
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
        const sunCenterX = this.canvas.width - 40;
        const sunCenterY = 40;
        const sunRadius = 20;
        this.context.beginPath();
        this.context.arc(sunCenterX, sunCenterY, sunRadius, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'yellow';
        this.context.fill();
    }
}
class Cloud {
    canvas;
    context;
    x;
    y;
    speed;
    constructor(canvas, context, x, y) {
        this.canvas = canvas;
        this.context = context;
        this.x = x;
        this.y = y;
        this.speed = 0.75; // Geschwindigkeit der Wolken
    }
    draw() {
        const cloudWidth = 120;
        const cloudHeight = 30;
        const cornerRadius = 20;
        this.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.context.beginPath();
        this.context.moveTo(this.x + cornerRadius, this.y);
        this.context.arcTo(this.x + cloudWidth, this.y, this.x + cloudWidth, this.y + cornerRadius, cornerRadius);
        this.context.arcTo(this.x + cloudWidth, this.y + cloudHeight, this.x + cloudWidth - cornerRadius, this.y + cloudHeight, cornerRadius);
        this.context.arcTo(this.x, this.y + cloudHeight, this.x, this.y + cloudHeight - cornerRadius, cornerRadius);
        this.context.arcTo(this.x, this.y, this.x + cornerRadius, this.y, cornerRadius);
        this.context.closePath();
        this.context.fill();
    }
    update() {
        this.x += this.speed;
        if (this.x > this.canvas.width) {
            this.x = -120; // Wolke Loop
        }
    }
}
class Bird {
    x;
    y;
    behavior;
    speedX;
    speedY;
    startX;
    startY;
    targetX;
    targetY;
    color;
    canvas;
    context;
    constructor(canvas, context, x, y, behavior, color) {
        this.x = x;
        this.y = y;
        this.behavior = behavior;
        this.canvas = canvas;
        this.context = context;
        this.color = color;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.targetX = x + 50;
        this.targetY = y;
        this.speedX = 0.5;
        this.speedY = 1;
    }
    draw() {
        // Zeichne den Vogel
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, 10, 5);
        this.context.fillStyle = "#757575";
        this.context.fillRect(this.x + 7, this.y - 1.5, 10, 5);
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x - 3, this.y - 6, 6, 6);
        this.context.fillStyle = "orange";
        this.context.fillRect(this.x + 3, this.y - 3, 4, 2);
        this.context.fillStyle = "#757575";
        this.context.fillRect(this.x + 2, this.y + 5, 1, 5);
        this.context.fillRect(this.x + 7, this.y + 5, 1, 5);
    }
    //Verhaltensweisen
    update() {
        switch (this.behavior) {
            case 'flying':
                this.fly();
                break;
            case 'walking':
                this.walk();
                break;
            case 'swimming':
                this.swim();
                break;
        }
    }
    setStartX(startX) {
        this.startX = startX;
    }
    setStartY(startY) {
        this.startY = startY;
    }
    setTargetX(targetX) {
        this.targetX = targetX;
    }
    setTargetY(targetY) {
        this.targetY = targetY;
    }
    setSpeedX(speedX) {
        this.speedX = speedX;
    }
    setSpeedY(speedY) {
        this.speedY = speedY;
    }
    fly() {
        const flySpeedX = 0.7;
        const flyAmplitude = 5;
        this.x += flySpeedX;
        const minHeight = 10;
        const maxHeight = this.canvas.height * 0.75;
        this.y = Math.min(maxHeight, Math.max(minHeight, this.y + Math.sin(this.x / flyAmplitude) * 1));
        if (this.x > this.canvas.width) {
            this.x = -15; //Vogel Loop
            this.y = Math.random() * maxHeight;
        }
    }
    walk() {
        if (this.x < this.startX || this.x > this.targetX) {
            this.speedX *= -1; // Richtung umkehren an den Zielpunkten
        }
        this.x += this.speedX;
    }
    swim() {
        const pondWidth = 80;
        const pondHeight = 30;
        const pondX = (this.canvas.width - pondWidth) / 2;
        const mountainHeight = this.canvas.height * 0.75;
        const pondY = mountainHeight + (this.canvas.height - mountainHeight - pondHeight) / 2;
        const leftBorder = pondX;
        const rightBorder = pondX + pondWidth;
        const swimSpeedX = 0.2;
        if (this.x < leftBorder) {
            this.x = leftBorder;
            this.speedX = swimSpeedX;
        }
        else if (this.x + 10 > rightBorder) {
            this.x = rightBorder - 10;
            this.speedX = -swimSpeedX;
        }
        this.x += this.speedX;
    }
}
class Sky {
    canvas;
    context;
    mountains;
    clouds;
    background;
    grassland;
    pond;
    sun;
    birds;
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas)
            throw new Error('Canvas element not found');
        this.context = this.canvas.getContext('2d');
        if (!this.context)
            throw new Error('Failed to get 2D context');
        this.background = new Background(this.canvas, this.context);
        this.grassland = new Grassland(this.canvas, this.context);
        this.pond = new Pond(this.canvas, this.context);
        this.sun = new Sun(this.canvas, this.context);
        this.mountains = [
            new Mountain(this.canvas, this.context, 25),
            new Mountain(this.canvas, this.context, 125),
            new Mountain(this.canvas, this.context, -75)
        ];
        this.clouds = [
            new Cloud(this.canvas, this.context, 5, 5),
            new Cloud(this.canvas, this.context, 50, 30),
            new Cloud(this.canvas, this.context, 100, 10)
        ];
        const pondX = (this.canvas.width - 80) / 2;
        const mountainHeight = this.canvas.height * 0.75;
        const pondY = mountainHeight + (this.canvas.height - mountainHeight - 30) / 2;
        this.birds = [
            new Bird(this.canvas, this.context, this.canvas.width * 0.2, this.canvas.height * 0.1, "flying", "#FF5722"), // Orangener Vogel (fliegt)
            new Bird(this.canvas, this.context, 10 + 15, mountainHeight + (this.canvas.height - mountainHeight - 30) / 2 + 7, "walking", "#4CAF50"), // Grüner Vogel (läuft)
            new Bird(this.canvas, this.context, pondX + 15, pondY + 15, "swimming", "#000000"), // Schwarzer Vogel (schwimmt)
            new Bird(this.canvas, this.context, pondX - 15, pondY, "swimming", "#FFEB3B"), // Gelber Vogel (schwimmt)
            new Bird(this.canvas, this.context, this.canvas.width * 0.6, this.canvas.height * 0.15, "flying", "#9C27B0"), // Lila Vogel (fliegt)
            new Bird(this.canvas, this.context, this.canvas.width * 0.7, mountainHeight + 22, "walking", "#FF9800") // Hell Oranger Vogel (läuft)
        ];
        this.animate();
    }
    draw() {
        this.background.draw();
        for (let mountain of this.mountains) {
            mountain.draw();
        }
        this.grassland.draw();
        this.pond.draw();
        this.sun.draw();
        for (let cloud of this.clouds) {
            cloud.draw();
        }
    }
    update() {
        for (let cloud of this.clouds) {
            cloud.update();
        }
    }
    updateBirds() {
        for (let bird of this.birds) {
            bird.update();
        }
    }
    drawBirds() {
        for (let bird of this.birds) {
            bird.draw();
        }
    }
    animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        this.update();
        this.updateBirds();
        this.drawBirds();
        requestAnimationFrame(() => this.animate());
    }
}
const sky = new Sky('canvas');
//# sourceMappingURL=script.js.map