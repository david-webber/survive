export default class extends Phaser.Scene {
	constructor() {
		super({
			key: "menu",
		});
	}
	create(){
		const text = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'You Died', { font: '64px Arial' });
		text.setAlign('center');
		text.setOrigin(0.5)

		this.input.once('pointerdown', function (event) {
			this.scene.start('survive');
		}, this);
	}
}