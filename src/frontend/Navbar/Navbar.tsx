import { Component, JSX } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { Login } from './Login/Login';

export class Navbar extends Component {
	render = (): JSX.Element =>
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
					Word Game
				</Typography>
				<Login/>
			</Toolbar>
		</AppBar>
}
