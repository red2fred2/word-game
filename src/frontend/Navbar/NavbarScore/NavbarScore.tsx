import { Component, JSX } from 'react';
import { Typography } from '@mui/material';

import './navbar-score.scss';

export default class NavbarScore extends Component {
	render = (): JSX.Element =>
		<Typography className="navbar-score" variant="h6" component="div" sx={{ flexGrow: 1 }}>
			Score: 999999
		</Typography>
}
