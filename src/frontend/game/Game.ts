/**
 * Keeps track of game state and information
 * @packageDocumentation
 */

import { generateLetters, GenerationOptions } from "./generation";

/**
 * Keeps track of game state and information
 */
export class Game {
	/** Letters on the game board */
	letters: string[][];
	/** Size of the board, size X size */
	size: number;

	constructor(size: number) {
		this.size = size;

		const generationOptions: GenerationOptions = {
			boardSize: size
		};
		this.letters = generateLetters(generationOptions);
	}

	/** Gets a letter on the game board */
	getLetter = (row: number, col: number): string =>
		this.letters[row][col];
}
