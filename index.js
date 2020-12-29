
import Phaser from "phaser"

var settings = {
	width: window.innerWidth,
	height: window.innerHeight,
	enemies: {
		total: 6,
		speed: 150,
		colour: 0xff0000
	},
	player: {
		lives: 3,
	},
}

var config = {
	type: Phaser.AUTO,
	width: settings.width,
	height: settings.height,
	physics: {
			default: 'arcade',
			arcade: {
				debug: true,
			}
	},
	scene: {
			preload,
			create,
			update
	}
};


var game = new Phaser.Game(config);

function preload ()
{

}

function create ()
{

			var square = [
				'22222222222222',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'2............2',
				'22222222222222',
		];

		var pixelSize = 3;
		this.textures.generate('square', { data: square, pixelWidth: pixelSize, pixelHeight: pixelSize });

		this.player = this.physics.add.image(config.width / 2, config.height / 2, 'square');
		this.player.setImmovable(true);

	  this.enemies = this.physics.add.group();
		for(var i = 0; i < settings.enemies.total; i++){
			createEnemy(this);
		}

		this.physics.add.collider(this.player, this.enemies, (p,e) => {
			settings.player.lives--;
			this.enemies.remove(e, true,true);
			createEnemy(this);
		});


		this.enemies.children.iterate(enemy => {
			this.physics.moveToObject(enemy, this.player, settings.enemies.speed);
		});


		this.pointer = this.input.activePointer;

}



function update(){
	if(settings.player.lives <= 0){
		this.enemies.destroy(true);
		this.player.destroy()
	}
}

function createEnemy(game){
	if(game.enemies.countActive(true) < settings.enemies.total){
		var topY = Phaser.Math.Between(0, -(config.height / 2));
		var bottomY = Phaser.Math.Between(config.height, config.height  * 1.5);
		var leftX = Phaser.Math.Between(0, -(config.width / 2));
		var rightX = Phaser.Math.Between(config.width, config.width * 1.5);

		var y = (Math.random() < 0.5)?topY:bottomY;
		var x = (Math.random() < 0.5)?leftX:rightX;

		var newenemy = game.enemies.create(x,y,'square',0);
		newenemy.setTint(settings.enemies.colour);
		newenemy.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			game.enemies.remove(newenemy, true, true);
			createEnemy(game);
		});
		game.physics.moveToObject(newenemy, game.player, settings.enemies.speed);
	}
}