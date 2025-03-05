import { Component, createRef, JSX, RefObject } from 'react';
import { Box } from '@mui/material';

import './tile.scss';

const TILE_GOOD_BAD_TIMEOUT_MS: number = 500;

export type ActivationCallback = (goodCallback: () => void, badCallback: () => void, isActive: boolean) => void;

export enum TileState {
	Inactive,
	Active,
	Good,
	Bad
}

export interface TileProps {
	letter: string,
	activationCallback: ActivationCallback
}

export interface TileComponentState {
	state: TileState
}

export default class Tile extends Component<TileProps, TileComponentState> {
	elementRef: RefObject<Element | null> = createRef();

	constructor(props: TileProps) {
		super(props);
		this.state = {state: TileState.Inactive};
	}

	// Add event handlers on component mount
	componentDidMount = (): void => {
		const element: Element = this.elementRef.current!;
		element.addEventListener('click', this.activate);
	}

	activate = (): void => {
		this.setState({state: TileState.Active});

		let isActive: boolean = this.state.state !== TileState.Inactive;
		this.props.activationCallback(this.setGood, this.setBad, isActive);
	}

	// Returns the css class that corresponds to the current tile state
	getStateClass = (): string => {
		switch(this.state.state) {
			case TileState.Inactive:
				return 'tile-inactive';
			case TileState.Active:
				return 'tile-active';
			case TileState.Good:
				return 'tile-good';
			case TileState.Bad:
				return 'tile-bad';
			default:
				throw new Error('Tile has impossible state');
		}
	}

	// Sets the tile to the bad state, then inactive after a moment
	setBad = (): void => {
		this.setState({state: TileState.Bad});
		setTimeout(this.setInactive, TILE_GOOD_BAD_TIMEOUT_MS);
	}

	// Sets the tile to the good state, then inactive after a moment
	setGood = (): void => {
		this.setState({state: TileState.Good});
		setTimeout(this.setInactive, TILE_GOOD_BAD_TIMEOUT_MS);
	}

	// Sets the tile to the inactive state
	setInactive = (): void => {
		this.setState({state: TileState.Inactive});
	}

	render = (): JSX.Element =>
		<Box
			className={"tile " + (this.getStateClass())}
			ref={this.elementRef}
		>
			<Box className="tile-inner">
				{this.props.letter}
			</Box>
		</Box>
}
