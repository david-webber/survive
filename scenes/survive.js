


export default class extends Phaser.Scene {
	constructor() {
		super({
			key: "survive",
		});
	}


	create(){

		this.settings = {
			enemies: {
				total: 6,
				speed: 150,
				colour: 0xff0000
			},
			player: {
				lives: 3,
			},
		}

		this.player = this.physics.add.image(this.game.config.width / 2, this.game.config.height / 2, 'square');
		this.player.setImmovable(true);

	  this.enemies = this.physics.add.group();
		for(let i = 0; i < this.settings.enemies.total; i++){
			this.createEnemy(this);
		}

		this.physics.add.collider(this.player, this.enemies, (p,e) => {
			this.settings.player.lives--;
			this.enemies.remove(e, true,true);
			this.createEnemy(this);
		});


		this.enemies.children.iterate(enemy => {
			this.physics.moveToObject(enemy, this.player, this.settings.enemies.speed);
		});


		this.pointer = this.input.activePointer;

}



	update(){
		if(this.settings.player.lives <= 0){
			this.enemies.destroy(true);
			this.player.destroy();
			this.scene.start('menu')
		}
	}

	createEnemy(game){

		const width = this.game.config.width;
		const height = this.game.config.height;

		if(game.enemies.countActive(true) < this.settings.enemies.total){
			const topY = Phaser.Math.Between(0, -(height / 2));
			const bottomY = Phaser.Math.Between(height, height  * 1.5);
			const leftX = Phaser.Math.Between(0, -(width / 2));
			const rightX = Phaser.Math.Between(width, width * 1.5);

			const y = (Math.random() < 0.5)?topY:bottomY;
			const x = (Math.random() < 0.5)?leftX:rightX;

			const newenemy = game.enemies.create(x,y,'square',0);
			newenemy.setTint(this.settings.enemies.colour);
			newenemy.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
				game.enemies.remove(newenemy, true, true);
				game.createEnemy(game);
			});
			game.physics.moveToObject(newenemy, game.player, this.settings.enemies.speed);
		}
	}

}

