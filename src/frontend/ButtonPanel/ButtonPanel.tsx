import { Component, JSX } from 'react';
import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import FlipIcon from '@mui/icons-material/Flip';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';

import './button-panel.scss';

export interface ButtonPanelProps {}

export interface ButtonPanelState {
	score: number
}

export class ButtonPanel extends Component<ButtonPanelProps, ButtonPanelState> {
	constructor(props: ButtonPanelProps) {
		super(props);

		this.state = {
			score: 0
		}
	}

	componentDidMount = (): void => {
		window.addEventListener('score-change', (event: CustomEventInit<number>) =>
			this.setState({score: event.detail!})
		);
	}

	render = (): JSX.Element =>
		<Box className="flex-container interaction-buttons">
			<Box className="flex-container score-timer-container">
				<Card className="timer">
					<Typography variant="h2" component="div">
						1:00:00
					</Typography>
				</Card>
				<Typography className="score" variant="h3" component="div">
					Score:
					<br className="desktop-only" />
					{this.state.score}
				</Typography>
			</Box>
			<Box className="game-buttons">
				<Button aria-label="Hint" color="primary" size="large" variant="contained">
					Hint
				</Button>
				<Button aria-label="New Game" color="primary" size="large" variant="contained">
					New Game
				</Button>
			</Box>
			<Box className="rearrangement-buttons">
				<IconButton aria-label="Rotate Left" className="icon-button" onClick={() => window.dispatchEvent(new Event('rotate-ccw'))}>
					<Rotate90DegreesCcwIcon/>
				</IconButton>
				<IconButton aria-label="Flip X" className="icon-button" onClick={() => window.dispatchEvent(new Event('flip-x'))}>
					<FlipIcon/>
				</IconButton>
				<IconButton aria-label="Flip Y" className="icon-button rotate-90" onClick={() => window.dispatchEvent(new Event('flip-y'))}>
					<FlipIcon/>
				</IconButton>
				<IconButton aria-label="Rotate Right" className="icon-button" onClick={() => window.dispatchEvent(new Event('rotate-cw'))}>
					<Rotate90DegreesCwIcon/>
				</IconButton>
			</Box>
		</Box>
}
