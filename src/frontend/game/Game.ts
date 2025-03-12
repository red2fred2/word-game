/**
 * Keeps track of game state and information
 * @packageDocumentation
 */

import { generateLetters, GenerationOptions } from './generation';

import dictionary from './dictionary.json';

export enum WordCheck {
	AlreadyFound,
	Found,
	NotFound
}

/**
 * Keeps track of game state and information
 */
export class Game {
	/** Letters on the game board */
	letters: string[][];
	/** Size of the board, size X size */
	size: number;
	/** Words that have been found */
	wordsFound: string[];

	constructor(size: number) {
		this.size = size;
		this.wordsFound = [];

		const generationOptions: GenerationOptions = {
			boardSize: size
		};
		this.letters = generateLetters(generationOptions);
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
			return WordCheck.Found;
		} else {
			return WordCheck.NotFound;
		}
	}

	/** Gets a letter on the game board */
	getLetter = (row: number, col: number): string =>
		this.letters[row][col];
}
