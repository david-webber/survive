
import Phaser from "phaser";

import preload from "./scenes/preload";
import menu from "./scenes/menu";
import survive from "./scenes/survive";



var config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
			default: 'arcade',
			arcade: {
				debug: true,
			}
	},
	scene: [preload,survive,menu]
};


var game = new Phaser.Game(config);