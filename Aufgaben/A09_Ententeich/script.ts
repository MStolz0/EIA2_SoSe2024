class Background {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        
        this.context.fillStyle = "#cfe4f7";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Mountains {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        // Berge zeichnen
        const mountainHeight: number = this.canvas.height * 0.75; 
        const mountainWidth: number = this.canvas.width + 200; 

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
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        // Wiese zeichnen
        const height: number = this.canvas.height * 0.75; 

        this.context.fillStyle = "#8bc34a"; 
        this.context.fillRect(0, height, this.canvas.width, this.canvas.height - height);
    }
}

class Pond {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        // Teich zeichnen
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
        // Sonne zeichnen
        const sunCenterX: number = this.canvas.width - 40; 
        const sunCenterY: number = 40; 
        const sunRadius: number = 20; 

        this.context.beginPath();
        this.context.arc(sunCenterX, sunCenterY, sunRadius, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'yellow';
        this.context.fill();
    }
}

class Clouds {
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(): void {
        // Wolken zeichnen
        this.context.fillStyle = 'rgba(255, 255, 255, 0.5)'; 

        
        this.drawCloud(5, 5);
        
        this.drawCloud(50, 30);
        
        this.drawCloud(100, 10);
    }

    private drawCloud(startX: number, startY: number): void {
        const cloudWidth: number = 120;
        const cloudHeight: number = 30;
        const cornerRadius: number = 20;

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
    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {}

    draw(pondX: number, pondY: number): void {
        // Vögel zeichnen

        // Vögel im Teich
        this.drawBird(pondX - 15, pondY, "#000000"); // Schwarzer Vogel
        this.drawBird(pondX + 15, pondY + 7, "#4CAF50"); // Grüner Vogel

        // Vögel in der Luft
        this.drawBird(this.canvas.width * 0.2, this.canvas.height * 0.1, "#FF5722"); // Orangener Vogel
        this.drawBird(this.canvas.width * 0.6, this.canvas.height * 0.15, "#9C27B0"); // Lila Vogel

        // Vögel auf der Wiese
        const mountainHeight: number = this.canvas.height * 0.75; 
        this.drawBird(this.canvas.width * 0.3, mountainHeight + 15, "#FFEB3B"); // Gelber Vogel
        this.drawBird(this.canvas.width * 0.7, mountainHeight + 22, "#FF9800"); // Hell Oranger Vogel
    }

    private drawBird(x: number, y: number, color: string): void {
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
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.draw();
    }

    private draw(): void {
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

        const height: number = this.canvas.height * 0.75; 
        const birds = new Birds(this.canvas, this.context);
        birds.draw((this.canvas.width - 80) / 2, height + (this.canvas.height - height - 30) / 2);
    }
}

const sky = new Sky('canvas');
