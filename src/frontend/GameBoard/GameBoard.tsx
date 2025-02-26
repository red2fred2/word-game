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
				['A', 'B', 'C', 'D'],
				['E', 'F', 'G', 'H'],
				['I', 'J', 'K', 'L'],
				['M', 'N', 'O', 'P']
			],
			sizeClass: `grid-${props.size}`
		};
	}

	createTiles(): JSX.Element[] {
		let totalTiles: number = this.props.size * this.props.size;
		let tileNumbers: number[] = Array.from(Array(totalTiles).keys());
		return tileNumbers.map(num => {
			let row = num % this.props.size;
			let col = Math.floor(num / this.props.size);
			let letter = this.state.letters[col][row];

			return <Tile row={row} col={col} letter={letter}/>
		});
	}

	render = (): JSX.Element =>
		<Box className="game-board">
			<Box className={"game-board-container " + this.state.sizeClass}>
				{this.createTiles()}
			</Box>
		</Box>
}
