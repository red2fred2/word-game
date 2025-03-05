/**
 * The game board used to interact with the word game
 * @packageDocumentation
 */

import { Component, JSX } from 'react';
import { Box } from '@mui/material';

import Tile from './Tile/Tile';
import { ActivationCallback } from './Tile/Tile';

import './game-board.scss';

/**
 * React props for {@link GameBoard}
 */
export interface GameBoardProps {
	/**
	 * Creates a size X size {@link GameBoard}
	 * @remarks Size must be an integer between 3 and 6 inclusive
	 */
	size: number
}

/**
 * React state for {@link GameBoard}
 */
export interface GameBoardState {
	/** 2D array of letters on the board */
	letters: string[][],
	/**
	 * CSS class name to use for styling this particular size of board
	 * @remarks Will be something along the lines of 'grid-n'
	 */
	sizeClass: string
}

/**
 * The game board used to interact with the word game
 */
export default class GameBoard extends Component<GameBoardProps, GameBoardState> {
	/** Bad callbacks for the currently active {@link Tile | Tiles} on the board */
	badCallbacks: Function[];
	/** Good callbacks for the currently active {@link Tile | Tiles} on the board */
	goodCallbacks: Function[];
	/** The letters of the active {@link Tile | Tiles} */
	selectedLetters: string[];

	/**
	 * @constructor
	 * @param props - The {@link GameBoardProps | react props} passed to this GameBoard
	 */
	constructor(props: GameBoardProps) {
		// Error checking
		let badSize = props.size < 3 ||
			props.size > 6 ||
			props.size % 1 !== 0
		if(badSize) throw new Error('Incorrect size prop given to GameBoard');

		super(props);

		// Initialize properties
		this.badCallbacks = [];
		this.goodCallbacks = [];
		this.selectedLetters = [];

		// Initialize state
		this.state = {
			letters: [
				['A', 'B', 'C', 'D', 'E', 'F'],
				['G', 'H', 'I', 'J', 'K', 'L'],
				['M', 'N', 'O', 'P', 'Qu', 'R'],
				['S', 'T', 'U', 'V', 'W', 'X'],
				['Y', 'Z', 'A', 'B', 'C', 'D'],
				['E', 'F', 'G', 'H', 'I', 'J']
			],
			sizeClass: `grid-${props.size}`
		};
	}

	/**
	 * Clears the active {@link Tile | Tiles}
	 *
	 * @remarks Does not call good or bad callbacks, so the {@link Tile | Tiles}
	 * themselves will remain active if this is the only method used to clear them
	 */
	clearActiveTiles = (): void => {
		this.badCallbacks = [];
		this.goodCallbacks = [];
		this.selectedLetters = [];
	}

	/**
	 * Creates the array of {@link Tile} components to put on the game board
	 *
	 * @returns an array of {@link Tile | Tiles}
	 */
	createTiles = (): JSX.Element[] => {
		let totalTiles: number = this.props.size * this.props.size;
		let tileNumbers: number[] = Array.from(Array(totalTiles).keys());

		// Create array
		return tileNumbers.map(num => {
			let row: number = num % this.props.size;
			let col: number = Math.floor(num / this.props.size);
			let letter: string = this.state.letters[col][row];
			let tileCallback: ActivationCallback = this.getTileActivation(row, col, letter);

			return <Tile letter={letter} activationCallback={tileCallback} key={num}/>
		});
	}

	/**
	 * Gets the activation callback function for a specific {@link Tile}
	 *
	 * @remarks This is fairly nasty, but it seems like a decent enough way to
	 * avoid having the {@link Tile | Tiles} all hold onto this information when
	 * they can't use it on their own anyway.
	 *
	 * @param row - Row this {@link Tile} is on
	 * @param col - Column this {@link Tile} is on
	 * @param letter - Letter displayed on the {@link Tile}
	 *
	 * @param goodCallback - Callback function to run when something good happens
	 * to the {@link Tile}
	 * @param badCallback - Callback function to run when something bad happens to
	 * the {@link Tile}
	 * @param isActive - Is this {@link Tile} already active?
	 *
	 * @returns An {@link ActivationCallback} function for a {@link Tile} to run when it is activated
	 */
	getTileActivation = (row: number, col: number, letter: string): ActivationCallback =>
		(goodCallback: () => void, badCallback: () => void, isActive: boolean) => {
			// Do something when re-clicking an active tile, then bail out
			if(isActive) {
				console.log(this.selectedLetters);
				forEachWithDelay(this.goodCallbacks, cb => cb(), 50);
				this.clearActiveTiles();

				return;
			}

			// Add active tile information
			this.badCallbacks.push(badCallback);
			this.goodCallbacks.push(goodCallback);
			this.selectedLetters.push(letter);
	}

	/**
	 * Renders the react component
	 */
	render = (): JSX.Element =>
		<Box className="game-board">
			<Box className={"game-board-container " + this.state.sizeClass}>
				{this.createTiles()}
			</Box>
		</Box>
}

/**
 * Run a foreach loop with a `delay` ms delay between each execution
 *
 * @param array - Array to be looped over
 * @param callback - Callback function to run over the array
 * @param delay - Delay between each callback being run
 */
function forEachWithDelay(array: any[], callback: (arg0: any) => void, delay: number) {
	array.forEach((element, index) =>
		setTimeout(callback, delay * index, element));
}
