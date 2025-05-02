/**
 * Keeps track of game state and information
 * @packageDocumentation
 */

import wasmInit, {Game, WordCheck} from 'word-game';

/**
 * Keeps track of game state and information
 */
export class GameJ {
	game: Game;
	/** Is true when webassembly has loaded and everything has generated */
	ready: boolean;

	constructor(readyCallback: Function, size: number) {
		this.ready = false;
		this.init(size, readyCallback);
	}

	/**
	 * Initialize the asynchronous stuff
	 */
	init = async (size: number, readyCallback: Function) => {
		await wasmInit('word_game_bg.wasm');
		this.game = new Game(size);
		this.ready = true;
		readyCallback();
	}

	checkWord = (word: string): WordCheck =>
		this.game.check_word(word);

	getLetter = (row: number, col: number): string =>
		this.game.get_letter(row, col);
}
