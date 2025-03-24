/**
 * Keeps track of game state and information
 * @packageDocumentation
 */

import { generateLetters, GenerationOptions } from './generation';

import dictionary from './dictionary.json';

const LETTER_VALUES = new Map(Object.entries({A: 12, B: 55, C: 23, D: 31, E: 9, F: 89, G: 42, H: 38, I: 11, J: 641, K: 139, L: 18, M: 33, N: 14, O: 14, P: 31, Q: 594, R: 14, S: 14, T: 15, U: 27, V: 106, W: 156, X: 333, Y: 50, Z: 237}));

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
	/** Current game score */
	score: number;
	/** Size of the board, size X size */
	size: number;
	/** Words that have been found */
	wordsFound: string[];

	constructor(size: number) {
		this.score = 0;
		this.size = size;
		this.wordsFound = [];

		const generationOptions: GenerationOptions = {
			boardSize: size
		};
		this.letters = generateLetters(generationOptions);
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
		return word.toUpperCase()
			.split('')
			.reduce((wordValue: number, letter: string) => {
				const letterValue = LETTER_VALUES.get(letter)!;
				return wordValue + letterValue
			}, 0);
	}

	/** Gets a letter on the game board */
	getLetter = (row: number, col: number): string =>
		this.letters[row][col];
}
