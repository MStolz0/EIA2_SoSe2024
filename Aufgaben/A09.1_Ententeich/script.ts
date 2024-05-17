class Background {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        this.context.fillStyle = "#cfe4f7";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Mountain {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D, private x: number) {}

    draw(): void {
        const mountainHeight: number = this.canvas.height * 0.75; 
        const mountainWidth: number = this.canvas.width + 200; 

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
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        const height: number = this.canvas.height * 0.75; 

        this.context.fillStyle = "#8bc34a"; 
        this.context.fillRect(0, height, this.canvas.width, this.canvas.height - height);
    }
}

class Pond {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        const pondWidth: number = 80;
        const pondHeight: number = 30;
        const pondX: number = (this.canvas.width - pondWidth) / 2; 
        const mountainHeight: number = this.canvas.height * 0.75; 
        const pondY: number = mountainHeight + (this.canvas.height - mountainHeight - pondHeight) / 2; 

        this.context.fillStyle = "#1976d2"; 
        this.context.fillRect(pondX, pondY, pondWidth, pondHeight);
    }
}

class Sun {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        const sunCenterX: number = this.canvas.width - 40; 
        const sunCenterY: number = 40; 
        const sunRadius: number = 20; 

        this.context.beginPath();
        this.context.arc(sunCenterX, sunCenterY, sunRadius, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'yellow';
        this.context.fill();
    }
}

class Cloud {
    private speed: number;
    
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D, private x: number, private y: number) {
        this.speed = 0.75; // Geschwindigkeit der Wolken
    }

    draw(): void {
        const cloudWidth: number = 120;
        const cloudHeight: number = 30;
        const cornerRadius: number = 20;

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

    update(): void {
        this.x += this.speed;
        if (this.x > this.canvas.width) {
            this.x = -120; // Wolke erscheint wieder links
        }
    }
}

class Bird {
    private speedX: number;
    private speedY: number;
    private startX: number;
    private startY: number;
    private targetX: number;
    private targetY: number;
    private color: string;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, private x: number, private y: number, private behavior: string, color: string) {
        this.canvas = canvas;
        this.context = context;
        this.color = color;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.targetX = x + 100;
        this.targetY = y;
        this.speedX = 1; 
        this.speedY = 1;
    }

    draw(): void {
        // Zeichne den Vogel
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, 15, 10); // Korrekte Zeichenanweisungen für einen Vogel
        this.context.fillStyle = "#757575";
        this.context.fillRect(this.x + 7, this.y - 1, 15, 7);
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x - 3, this.y - 6, 6, 6);
        this.context.fillStyle = "orange";
        this.context.fillRect(this.x + 3, this.y - 3, 4, 2);
        this.context.fillStyle = "#757575";
        this.context.fillRect(this.x + 7, this.y + 10, 1, 5);
        this.context.fillRect(this.x + 12, this.y + 10, 1, 5);
    }

    update(): void {
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

    setStartX(startX: number): void {
        this.startX = startX;
    }

    setStartY(startY: number): void {
        this.startY = startY;
    }

    setTargetX(targetX: number): void {
        this.targetX = targetX;
    }

    setTargetY(targetY: number): void {
        this.targetY = targetY;
    }

    setSpeedX(speedX: number): void {
        this.speedX = speedX;
    }

    setSpeedY(speedY: number): void {
        this.speedY = speedY;
    }

    private fly(): void {
        // Fliegen: Von links nach rechts durch den Bildschirm fliegen
        this.x += this.speedX;
        this.y += Math.sin(this.x / 20) * 2; // Vertikale Oszillation beim Fliegen
        if (this.x > this.canvas.width) {
            this.x = -15; // Setze den Vogel zurück, wenn er den Bildschirmrand erreicht
            this.y = Math.random() * this.canvas.height;
        }
    }

    private walk(): void {
        // Gehen: Hin und her zwischen Start- und Zielposition laufen
        if (this.x < this.startX || this.x > this.targetX) {
            this.speedX *= -1; // Richtung umkehren an den Zielpunkten
        }
        this.x += this.speedX;
    }
    
    private swim(): void {
        // Schwimmen: Hin und her innerhalb des Teichbereichs schwimmen
        const minX = this.startX + 5; // Linke Begrenzung des Teichs
        const maxX = this.startX + 35; // Rechte Begrenzung des Teichs
    
        // Überprüfe, ob der Vogel am Rand des Teichs ist, und ändere die Richtung entsprechend
        if (this.x <= minX || this.x >= maxX) {
            this.speedX *= -1; // Richtung umkehren
        }
    
        // Aktualisiere die Position des Vogels basierend auf der Geschwindigkeit
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
}


class Sky {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private mountains: Mountain[];
    private clouds: Cloud[];
    private background: Background;
    private grassland: Grassland;
    private pond: Pond;
    private sun: Sun;
    private birds: Bird[];

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!this.canvas) throw new Error('Canvas element not found');
        this.context = this.canvas.getContext('2d');
        if (!this.context) throw new Error('Failed to get 2D context');

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

        const pondX: number = (this.canvas.width - 80) / 2;
        const mountainHeight: number = this.canvas.height * 0.75;

        this.birds = [
            new Bird(this.canvas, this.context, this.canvas.width * 0.2, this.canvas.height * 0.1, "flying", "#FF5722"), // Orangener Vogel (fliegt)
            new Bird(this.canvas, this.context, pondX + 15, mountainHeight + (this.canvas.height - mountainHeight - 30) / 2 + 7, "walking", "#4CAF50"), // Grüner Vogel (fliegt)
            new Bird(this.canvas, this.context, pondX - 15, mountainHeight + (this.canvas.height - mountainHeight - 30) / 2, "swimming", "#000000"), // Schwarzer Vogel (schwimmt)
            new Bird(this.canvas, this.context, this.canvas.width * 0.3, mountainHeight + 15, "swimming", "#FFEB3B"), // Gelber Vogel (schwimmt)
            new Bird(this.canvas, this.context, this.canvas.width * 0.6, this.canvas.height * 0.15, "flying", "#9C27B0"), // Lila Vogel (fliegt)
            new Bird(this.canvas, this.context, this.canvas.width * 0.7, mountainHeight + 22, "walking", "#FF9800") // Hell Oranger Vogel (läuft)
        ];

        this.animate();
    }

    private draw(): void {
        this.background.draw();
        for (let mountain of this.mountains) {
            mountain.draw();
        }
        this.grassland.draw(); // Draw grassland before mountains
        this.pond.draw(); // Draw pond before mountains
        this.sun.draw();
        for (let cloud of this.clouds) {
            cloud.draw();
        }
    }

    private update(): void {
        for (let cloud of this.clouds) {
            cloud.update();
        }
    }

    private updateBirds(): void {
        for (let bird of this.birds) {
            bird.update();
        }
    }

    private drawBirds(): void {
        for (let bird of this.birds) {
            bird.draw();
        }
    }

    private animate(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        this.update();
        this.updateBirds(); // Aktualisiere die Vögel
        this.drawBirds(); // Zeichne die Vögel
        requestAnimationFrame(() => this.animate());
    }
}

const sky = new Sky('canvas');
