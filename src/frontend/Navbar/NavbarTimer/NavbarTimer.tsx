import { Component, JSX } from 'react';
import { Card, Typography } from '@mui/material';

import './navbar-timer.scss';

export class NavbarTimer extends Component {
	render = (): JSX.Element =>
		<Card className="navbar-timer">
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				1:00:00
			</Typography>
		</Card>
}
