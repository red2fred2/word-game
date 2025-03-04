import { Component, JSX } from 'react';
import { Box } from '@mui/material';

import Tile from './Tile/Tile';

import './game-board.scss';

export interface GameBoardProps {
	size: number
}

export interface GameBoardState {
	letters: String[][],
	sizeClass: String
}

export default class GameBoard extends Component<GameBoardProps, GameBoardState> {
	constructor(props: GameBoardProps) {
		if(props.size < 3 || props.size > 6) throw new Error('Incorrect size prop given to GameBoard');

		super(props);

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

	createTiles = (size: number, letters: String[][]): JSX.Element[] => {
		let totalTiles: number = size * size;
		let tileNumbers: number[] = Array.from(Array(totalTiles).keys());

		return tileNumbers.map(num => {
			let row: number = num % size;
			let col: number = Math.floor(num / size);
			let letter: String = letters[col][row];

			return <Tile row={row} col={col} letter={letter} key={num}/>
		});
	}

	render = (): JSX.Element =>
		<Box className="game-board">
			<Box className={"game-board-container " + this.state.sizeClass}>
				{this.createTiles(this.props.size, this.state.letters)}
			</Box>
		</Box>
}
