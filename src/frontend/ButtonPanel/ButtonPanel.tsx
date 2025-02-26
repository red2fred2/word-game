import { Component, JSX } from 'react';
import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import FlipIcon from '@mui/icons-material/Flip';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';

import './interaction-buttons.scss';

export default class ButtonPanel extends Component {
	render = (): JSX.Element =>
		<Box className="flex-container interaction-buttons">
			<Box className="flex-container score-timer-container">
				<Card className="timer">
					<Typography variant="h2" component="div">
						1:00:00
					</Typography>
				</Card>
				<Typography className="score" variant="h3" component="div">
					Score: 999999
				</Typography>
			</Box>
			<Box className="game-buttons">
				<Button aria-label="Hint" color="secondary" size="large" variant="contained">
					Hint
				</Button>
				<Button aria-label="New Game" color="secondary" size="large" variant="contained">
					New Game
				</Button>
			</Box>
			<Box className="rearrangement-buttons">
				<IconButton aria-label="Rotate Left" className="icon-button">
					<Rotate90DegreesCcwIcon/>
				</IconButton>
				<IconButton aria-label="Flip X" className="icon-button">
					<FlipIcon/>
				</IconButton>
				<IconButton aria-label="Flip Y" className="icon-button rotate-90">
					<FlipIcon/>
				</IconButton>
				<IconButton aria-label="Rotate Right" className="icon-button">
					<Rotate90DegreesCwIcon/>
				</IconButton>
			</Box>
		</Box>
}
