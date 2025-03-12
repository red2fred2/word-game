/**
 * The game board used to interact with the word game
 * @packageDocumentation
 */

import { Component, JSX } from 'react';
import { Box } from '@mui/material';

import { WordCheck, Game } from '../game/Game';
import { ActivationCallback, Tile } from './Tile/Tile';

import './game-board.scss';
import { None, Option } from '../Option';

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
	flipX: boolean,
	flipY: boolean,
	rotation: number,
	/**
	 * CSS class name to use for styling this particular size of board
	 * @remarks Will be something along the lines of 'grid-n'
	 */
	sizeClass: string
}

/**
 * The game board used to interact with the word game
 */
export class GameBoard extends Component<GameBoardProps, GameBoardState> {
	/** Bad callbacks for the currently active {@link Tile | Tiles} on the board */
	badCallbacks: Function[];
	/** The game being played on this board */
	game: Game;
	/** Good callbacks for the currently active {@link Tile | Tiles} on the board */
	goodCallbacks: Function[];
	/** The last {@link Tile | Tiles} that was activated */
	lastActivatedTile: Option<[number, number]>;
	/** Mid callbacks for the currently active {@link Tile | Tiles} on the board */
	midCallbacks: Function[];
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
		this.clearActiveTiles();

		// Initialize state
		this.game = new Game(props.size);
		this.state = {
			flipX: false,
			flipY: false,
			rotation: 0,
			sizeClass: `grid-${props.size}`
		};
	}

	/**
	 * Tests whether it is possible to activate a tile at (row, col)
	 *
	 * @param row - Row of the {@link Tile} in question
	 * @param col - Column of the {@link Tile} in question
	 * @returns true if the tile can be activated, false if not
	 */
	canTileActivate = (row: number, col: number): boolean => {
		if(this.lastActivatedTile.isNone()) {
			return true;
		}

		let [lastRow, lastCol] = this.lastActivatedTile.getElse(()=>{})!;
		let rowGood = Math.abs(row - lastRow) <= 1;
		let colGood = Math.abs(col - lastCol) <= 1;

		return rowGood && colGood;
	}

	componentDidMount = (): void => {
		window.addEventListener('rotate-ccw', () => this.rotateCcw());
		window.addEventListener('rotate-cw', () => this.rotateCw());
		window.addEventListener('flip-x', () => this.flipX());
		window.addEventListener('flip-y', () => this.flipY());
	}

	/**
	 * Clears the active {@link Tile | Tiles}
	 *
	 * @remarks Does not call good or bad callbacks, so the {@link Tile | Tiles}
	 * themselves will remain active if this is the only method used to clear them
	 */
	clearActiveTiles = (): void => {
		this.badCallbacks = [];
		this.midCallbacks = [];
		this.goodCallbacks = [];
		this.lastActivatedTile = None();
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
			let letter: string = this.game.getLetter(row, col);
			let tileCallback: ActivationCallback = this.getTileActivation(row, col, letter);

			return <Tile letter={letter} activationCallback={tileCallback} key={num}/>
		});
	}

	flipX = (): void => {
		if(this.state.rotation == 90 || this.state.rotation == 270) {
			this.setState({flipY: !this.state.flipY});
		} else {
			this.setState({flipX: !this.state.flipX});
		}
	}

	flipY = (): void => {
		if(this.state.rotation == 90 || this.state.rotation == 270) {
			this.setState({flipX: !this.state.flipX});
		} else {
			this.setState({flipY: !this.state.flipY});
		}
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
	 * @param midCallback - Callback function to run when something not good happens
	 * to the {@link Tile}
	 * @param badCallback - Callback function to run when something bad happens to
	 * the {@link Tile}
	 * @param isActive - Is this {@link Tile} already active?
	 *
	 * @returns An {@link ActivationCallback} function for a {@link Tile} to run when it is activated
	 */
	getTileActivation = (row: number, col: number, letter: string): ActivationCallback =>
		(goodCallback: () => void, midCallback: () => void, badCallback: () => void, isActive: boolean) => {
			// Do something when re-clicking an active tile, then bail out
			if(isActive) {
				// Check if the word was real
				const word: string = this.selectedLetters.join('');
				const wordCheck: WordCheck = this.game.checkWord(word);

				if(wordCheck == WordCheck.Found) forEachWithDelay(this.goodCallbacks, cb => cb(), 50);
				else if(wordCheck == WordCheck.AlreadyFound) forEachWithDelay(this.midCallbacks, cb => cb(), 50);
				else forEachWithDelay(this.badCallbacks, cb => cb(), 50);

				this.clearActiveTiles();
				return true;
			}

			// See if this tile should be possible to activate
			if(!this.canTileActivate(row, col)) {
				return false;
			}

			// Add active tile information
			this.badCallbacks.push(badCallback);
			this.midCallbacks.push(midCallback);
			this.goodCallbacks.push(goodCallback);
			this.lastActivatedTile.set([row, col]);
			this.selectedLetters.push(letter);

			return true;
	}

	rotateCcw = (): void => {
		let rotation = this.state.rotation;
		rotation = (rotation + 270) % 360;
		this.setState({rotation: rotation});
		console.log(this.state.rotation);
	}

	rotateCw = (): void => {
		let rotation = this.state.rotation;
		rotation = (rotation + 90) % 360;
		this.setState({rotation: rotation});
		console.log(this.state.rotation);
	}

	/**
	 * Renders the react component
	 */
	render = (): JSX.Element =>
		<Box className="game-board">
			<Box className={`game-board-container board-animate ${this.state.sizeClass} board-rotate-${this.state.rotation} ${this.state.flipX ? "board-flip-x": ""} ${this.state.flipY ? "board-flip-y": ""}`}>
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
function forEachWithDelay<T>(array: T[], callback: (arg0: T) => void, delay: number) {
	array.forEach((element, index) =>
		setTimeout(callback, delay * index, element));
}
