
import Phaser from "phaser"

var settings = {
	width: window.innerWidth,
	height: window.innerHeight,
	enemies: 6,
}

var config = {
	type: Phaser.AUTO,
	width: settings.width - 100,
	height: settings.height - 100,
	physics: {
			default: 'arcade',
			arcade: {
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

		var pixelSize = 2;
		this.textures.generate('square', { data: square, pixelWidth: pixelSize, pixelHeight: pixelSize });

		this.player = this.physics.add.image(config.width / 2, config.height / 2, 'square');
		this.player.setImmovable(true);

	  this.enemies = this.physics.add.group({
			key: 'key',
			frame: [0, 1, 2, 3, 4],
			setXY:
				{
					x: 100,
					y: 100,
					stepX: 64,
					stepY: 64
				}
		});



	this.physics.add.collider(this.player, this.enemies, (p,e) => {
		this.enemies.remove(e, true);
		createEnemy(this);
	});


	this.enemies.children.iterate(enemy => {
		this.physics.moveToObject(enemy, this.player, 200);
	});

		// this.physics.moveToObject(enemies, player, 200);

		this.pointer = this.input.activePointer;

}



function update(){
	// if(this.enemies.countActive() <= 1){
	// 	this.enemies.getFirst
	// }
	// if (this.pointer.isDown) {
	// 	this.player.setScale(2);
	// }else{
	// 	this.player.setScale(1);
	// }


}

function createEnemy(game){
	if(game.enemies.countActive(true) < settings.enemies){
		var topY = Phaser.Math.Between(0, -(config.height / 2));
		var bottomY = Phaser.Math.Between(config.height, config.height  * 1.5);
		var leftX = Phaser.Math.Between(0, -(config.width / 2));
		var rightX = Phaser.Math.Between(config.width, config.width * 1.5);

		var y = (Math.random() < 0.5)?topY:bottomY;
		var x = (Math.random() < 0.5)?leftX:rightX;

		var newenemy = game.enemies.create(x,y,'key',0);
		newenemy.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			game.enemies.remove(newenemy, true);
			createEnemy(game);
		});
		game.physics.moveToObject(newenemy, game.player, 100);
	}
}