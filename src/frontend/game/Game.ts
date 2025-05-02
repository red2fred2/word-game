/**
 * Keeps track of game state and information
 * @packageDocumentation
 */

import wasmInit, {find_word_score, Game, InitOutput, WordCheck} from 'word-game';

/** Information */
export interface ScoreChange extends Event {
	detail: {
		score: number
	}
}

/**
 * Keeps track of game state and information
 */
export class GameJ {
	game: Game;
	/** Is true when webassembly has loaded and everything has generated */
	ready: boolean;
	/** Current game score */
	score: number;

	constructor(readyCallback: Function, size: number) {
		this.score = 0;
		this.ready = false;
		this.init(size, readyCallback);
	}

	/**
	 * Initialize the asynchronous stuff
	 */
	init = async (size: number, readyCallback: Function) => {
		const wasm: InitOutput = await wasmInit('word_game_bg.wasm');
		this.game = new Game(size);
		this.ready = true;
		readyCallback();
	}

	/**
	 * Finds the score of the word and adds it to the score
	 * @param word - Word to add to score
	 */
	AddWordToScore = (word: string): void => {
		const wordScore: number = find_word_score(word);
		this.score += wordScore;
		const details: {detail: {score: number}} = {detail: {score: this.score}};
		const event: ScoreChange = new CustomEvent('score-change', details);
		window.dispatchEvent(event);
	}

	checkWord = (word: string): WordCheck => {
		const result = this.game.check_word(word);
		if(result == WordCheck.Found) this.AddWordToScore(word);
		return result;
	}

	getLetter = (row: number, col: number): string =>
		this.game.get_letter(row, col);
}
