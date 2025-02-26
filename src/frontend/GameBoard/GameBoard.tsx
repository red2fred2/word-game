import { Component, JSX } from 'react';
import { Box,  Card } from '@mui/material';

import './game-board.scss';

export default class GameBoard extends Component {
	render = (): JSX.Element =>
		<Card className="game-board">
			board
		</Card>
}
