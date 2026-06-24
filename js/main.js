// Phaser 3 PvZ Fangame

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: GameScene
};

const game = new Phaser.Game(config);

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.sun = 100;
        this.plants = [];
        this.zombies = [];
        this.gameActive = true;
    }

    preload() {
        // Placeholder graphics - we'll create colored rectangles
    }

    create() {
        // Background
        this.add.rectangle(300, 400, 600, 800, 0x2a7f2a);

        // UI Background
        this.add.rectangle(300, 50, 600, 100, 0x1a1a1a);

        // Sun Counter
        this.sunText = this.add.text(20, 20, `Sun: ${this.sun}`, {
            font: '24px Arial',
            fill: '#ffff00'
        });

        // Plant Selection
        this.createPlantButtons();

        // Game grid (5 rows x 9 columns)
        this.createGameGrid();

        // Input
        this.input.on('pointerdown', this.handleClick, this);

        // Spawn zombies
        this.spawnZombies();
    }

    createPlantButtons() {
        const plantTypes = [
            { name: 'Sunflower', color: 0xffff00, sun: 50 },
            { name: 'Peashooter', color: 0x00ff00, sun: 100 },
            { name: 'Walnut', color: 0x8b4513, sun: 150 }
        ];

        let x = 20;
        plantTypes.forEach(plant => {
            const button = this.add.rectangle(x, 150, 50, 40, plant.color);
            button.setInteractive({ useHandCursor: true });
            button.on('pointerdown', () => this.selectPlant(plant.name, plant.sun));
            
            this.add.text(x - 15, 145, plant.name.substring(0, 3), {
                font: '10px Arial',
                fill: '#000000'
            });
            
            x += 70;
        });

        this.selectedPlant = null;
    }

    createGameGrid() {
        this.gridCells = [];
        const cellWidth = 60;
        const cellHeight = 100;
        const startX = 30;
        const startY = 200;

        for (let row = 0; row < 5; row++) {
            this.gridCells[row] = [];
            for (let col = 0; col < 9; col++) {
                const x = startX + col * cellWidth;
                const y = startY + row * cellHeight;
                
                const cell = this.add.rectangle(x, y, cellWidth - 5, cellHeight - 5, 0x1a5c1a);
                cell.setStrokeStyle(2, 0x0a3a0a);
                cell.setInteractive({ useHandCursor: true });
                cell.row = row;
                cell.col = col;
                cell.plant = null;
                
                cell.on('pointerdown', () => this.plantOnCell(cell));
                
                this.gridCells[row][col] = cell;
            }
        }
    }

    selectPlant(name, sunCost) {
        if (this.sun >= sunCost) {
            this.selectedPlant = { name, sunCost };
            console.log(`Selected: ${name}`);
        } else {
            console.log('Not enough sun!');
        }
    }

    plantOnCell(cell) {
        if (this.selectedPlant && !cell.plant) {
            if (this.sun >= this.selectedPlant.sunCost) {
                this.sun -= this.selectedPlant.sunCost;
                this.sunText.setText(`Sun: ${this.sun}`);
                
                // Create plant
                const plant = new Plant(this, cell.x, cell.y, this.selectedPlant.name);
                cell.plant = plant;
                this.plants.push(plant);
                
                // Visual feedback
                cell.setFillStyle(0x2a7f2a);
            }
        }
    }

    spawnZombies() {
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                if (this.gameActive) {
                    const randomRow = Phaser.Math.Between(0, 4);
                    const zombie = new Zombie(this, 550, 220 + randomRow * 100, 'basic');
                    this.zombies.push(zombie);
                }
            },
            loop: true
        });
    }

    update() {
        if (!this.gameActive) return;

        // Remove dead entities
        this.plants = this.plants.filter(p => p.active);
        this.zombies = this.zombies.filter(z => z.active);

        // Check if zombie reached the end
        this.zombies.forEach(zombie => {
            if (zombie.x < 0) {
                this.gameActive = false;
                console.log('Game Over! Zombie reached the end!');
            }
        });

        // Check if all zombies are dead
        if (this.zombies.length === 0 && this.gameActive) {
            // Continue spawning
        }
    }
}

class Plant extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y);
        this.type = type;
        this.health = 20;
        this.attackDamage = 10;
        this.attackCooldown = 1500;
        this.lastAttackTime = 0;
        this.active = true;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Visual representation
        const graphics = scene.make.graphics({ x, y, add: false });
        const colors = {
            'Sunflower': 0xffff00,
            'Peashooter': 0x00ff00,
            'Walnut': 0x8b4513
        };
        graphics.fillStyle(colors[type] || 0x00ff00, 1);
        graphics.fillCircle(0, 0, 20);

        this.displayList.add(graphics);
    }

    attack(target) {
        const now = Date.now();
        if (now - this.lastAttackTime > this.attackCooldown) {
            this.lastAttackTime = now;
            target.takeDamage(this.attackDamage);
            return true;
        }
        return false;
    }
}

class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y);
        this.type = type;
        this.health = 30;
        this.speed = 50;
        this.attackDamage = 10;
        this.attackCooldown = 1500;
        this.lastAttackTime = 0;
        this.active = true;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setVelocityX(-this.speed);

        // Visual representation
        const graphics = scene.make.graphics({ x, y, add: false });
        graphics.fillStyle(0x4db8ff, 1);
        graphics.fillRect(-15, -20, 30, 40);

        this.displayList.add(graphics);
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.active = false;
            this.destroy();
        }
    }

    attack(target) {
        const now = Date.now();
        if (now - this.lastAttackTime > this.attackCooldown) {
            this.lastAttackTime = now;
            target.health -= this.attackDamage;
            return true;
        }
        return false;
    }
}
