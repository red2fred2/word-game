import { Component, JSX } from 'react';
import { Box } from '@mui/material';

import Tile from './Tile/Tile';
import { ActivationCallback } from './Tile/Tile';

import './game-board.scss';

export interface GameBoardProps {
	size: number
}

export interface GameBoardState {
	letters: string[][],
	sizeClass: string
}

export default class GameBoard extends Component<GameBoardProps, GameBoardState> {
	badCallbacks: Function[];
	goodCallbacks: Function[];
	selectedLetters: string;

	constructor(props: GameBoardProps) {
		if(props.size < 3 || props.size > 6) throw new Error('Incorrect size prop given to GameBoard');

		super(props);

		this.badCallbacks = [];
		this.goodCallbacks = [];
		this.selectedLetters = '';

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

	createTiles = (size: number, letters: string[][]): JSX.Element[] => {
		let totalTiles: number = size * size;
		let tileNumbers: number[] = Array.from(Array(totalTiles).keys());

		return tileNumbers.map(num => {
			let row: number = num % size;
			let col: number = Math.floor(num / size);
			let letter: string = letters[col][row];
			let tileCallback: ActivationCallback = this.getTileActivation(row, col, letter);

			return <Tile letter={letter} activationCallback={tileCallback} key={num}/>
		});
	}

	clearActiveTiles = (): void => {
		this.badCallbacks = [];
		this.goodCallbacks = [];
		this.selectedLetters = '';
	}

	// Gets the activation callback function for a specific tile
	getTileActivation = (row: number, col: number, letter: string): ActivationCallback =>
		(goodCallback: () => void, badCallback: () => void, isActive: boolean) => {
			// Do something when re-clicking an active tile
			if(isActive) {
				console.log(this.selectedLetters);
				forEachWithDelay(this.goodCallbacks, cb => cb(), 50);
				this.clearActiveTiles();

				return;
			}

			// Add active information
			this.badCallbacks.push(badCallback);
			this.goodCallbacks.push(goodCallback);
			this.selectedLetters = this.selectedLetters.concat(letter);
	}

	render = (): JSX.Element =>
		<Box className="game-board">
			<Box className={"game-board-container " + this.state.sizeClass}>
				{this.createTiles(this.props.size, this.state.letters)}
			</Box>
		</Box>
}

// Run a foreach loop with a `delay` ms delay between each execution
function forEachWithDelay(array: any[], callback: (arg0: any) => void, delay: number) {
	array.forEach((element, index) =>
		setTimeout(callback, delay * index, element));
}
