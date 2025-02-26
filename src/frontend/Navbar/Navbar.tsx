import { Component, JSX } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import Login from './Login/Login';
import NavbarScore from './NavbarScore/NavbarScore';
import NavbarTimer from './NavbarTimer/NavbarTimer';

export default class Navbar extends Component {
	render = (): JSX.Element =>
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
					Word Game
				</Typography>
				<NavbarTimer/>
				<NavbarScore/>
				<Login/>
			</Toolbar>
		</AppBar>
}
