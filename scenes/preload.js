export default class extends Phaser.Scene {
	constructor() {
		super({
			key: "preload",
		});
	}
	preload(){

		const square = [
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

	const pixelSize = 3;
	this.textures.generate('square', { data: square, pixelWidth: pixelSize, pixelHeight: pixelSize });

	}
	create(){
		this.scene.start('survive');
	}
}