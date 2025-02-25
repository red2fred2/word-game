import { Component, JSX, StrictMode } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider, Theme } from '@mui/material/styles';

import Navbar from './Navbar/Navbar';

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

export default class App extends Component {
	render = (): JSX.Element =>
		<StrictMode>
			<ThemeProvider theme={theme}>
				<Navbar/>
				<img
					src="assets/Marie_Curie_c._1920s.jpg"
					alt="Marie Curie"
				/>
			</ThemeProvider>
		</StrictMode>
}
