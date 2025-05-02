/**
 * Keeps track of game state and information
 * @packageDocumentation
 */

import wasmInit, {find_word_score, generate_letters, InitOutput} from 'word-game';

import dictionary from './dictionary.json';

export enum WordCheck {
	AlreadyFound,
	Found,
	NotFound
}

/** Information */
export interface ScoreChange extends Event {
	detail: {
		score: number
	}
}

/**
 * Keeps track of game state and information
 */
export class Game {
	/** Letters on the game board */
	letters: string[][];
	/** Is true when webassembly has loaded and everything has generated */
	ready: boolean;
	/** Current game score */
	score: number;
	/** Size of the board, size X size */
	size: number;
	/** Words that have been found */
	wordsFound: string[];

	constructor(readyCallback: Function, size: number) {
		this.score = 0;
		this.size = size;
		this.wordsFound = [];
		this.ready = false;
		this.init(size, readyCallback);
	}

	/**
	 * Initialize the asynchronous stuff
	 */
	init = async (size: number, readyCallback: Function) => {
		const wasm: InitOutput = await wasmInit('word_game_bg.wasm');
		this.letters = generate_letters(size);
		this.ready = true;
		readyCallback();
	}

	/**
	 * Finds the score of the word and adds it to the score
	 * @param word - Word to add to score
	 */
	AddWordToScore = (word: string): void => {
		const wordScore: number = this.findWordScore(word);
		this.score += wordScore;
		const details: {detail: {score: number}} = {detail: {score: this.score}};
		const event: ScoreChange = new CustomEvent('score-change', details);
		window.dispatchEvent(event);
	}

	/** Checks to see if the word is in the dictionary
	 *
	 * @param word - Word to check
	 * @returns AlreadyFound, Found, NotFound
	 */
	checkWord = (word: string): WordCheck => {
		const lowercaseWord = word.toLowerCase();
		const alreadyFound = this.wordsFound.includes(lowercaseWord);
		const foundInDictionary = (dictionary as string[]).includes(lowercaseWord);

		if(alreadyFound) return WordCheck.AlreadyFound;

		if(foundInDictionary) {
			this.wordsFound.push(lowercaseWord);
			this.AddWordToScore(word);
			return WordCheck.Found;
		} else {
			return WordCheck.NotFound;
		}
	}

	/** Finds the score value of the current word
	 * @param word - Word to score
	 */
	findWordScore = (word: string): number => {
		return find_word_score(word);
	}

	/** Gets a letter on the game board */
	getLetter = (row: number, col: number): string =>
		this.letters[row][col];
}
