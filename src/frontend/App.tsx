import { Component, JSX, StrictMode } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider, Theme } from '@mui/material/styles';

import { GameBoard } from './GameBoard/GameBoard';
import { ButtonPanel } from './ButtonPanel/ButtonPanel';
import { Navbar } from './Navbar/Navbar';

import './style.scss';

const theme: Theme = createTheme({
	palette: {
	  primary: {
		main: '#3e9',
	  },
	  secondary: {
		main: '#b92e8c',
	  },
	},
  });

export class App extends Component {
	render = (): JSX.Element =>
		<StrictMode>
			<ThemeProvider theme={theme}>
				<Navbar/>
				<div className="body-container flex-container">
					<GameBoard size={4}/>
					<ButtonPanel/>
				</div>
			</ThemeProvider>
		</StrictMode>
}
