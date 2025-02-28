import { Component, JSX } from 'react';
import { Box } from '@mui/material';

import './tile.scss';

export interface TileProps {
	row: number,
	col: number,
	letter: String
}

export interface TileState {}

export default class Tile extends Component<TileProps> {
	constructor(props: TileProps) {
		if(props.row < 0) throw new Error('Tile was given a row < 0');
		if(props.col < 0) throw new Error('Col was given a row < 0');

		super(props);
	}

	render = (): JSX.Element =>
		<Box className="tile">
			<Box className="tile-inner">
				{this.props.letter}
			</Box>
		</Box>
}
