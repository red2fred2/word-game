import { Component, JSX } from 'react';

import './style.scss';

export default class App extends Component {
	render = (): JSX.Element =>
		<img
			src="assets/Marie_Curie_c._1920s.jpg"
			alt="Marie Curie"
		/>
}
