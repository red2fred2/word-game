/**
 * A tile on the game board that holds a letter
 * @packageDocumentation
 */

import { Component, createRef, JSX, RefObject } from 'react';
import { Box } from '@mui/material';

import './tile.scss';

const TILE_GOOD_BAD_TIMEOUT_MS: number = 500;

/**
 * The callback function to run when a Tile component is activated
 * @param goodCallback - Callback to run when something good happens to the tile
 * @param badCallback - Callback to run when something bad happens to the tile
 * @param isActive - Is this Tile already active?
 */
export type ActivationCallback = (goodCallback: () => void, badCallback: () => void, isActive: boolean) => void;

/**
 * State information for a {@link Tile}
 */
export enum TileState {
	/** This tile has not been activated */
	Inactive,
	/** This tile has been activated */
	Active,
	/** Something good happened to this tile */
	Good,
	/** Something bad happened to this tile */
	Bad
}

/**
 * React props for {@link Tile}
 */
export interface TileProps {
	/** The letter this Tile has */
	letter: string,
	/** The {@link ActivationCallback} for this Tile */
	activationCallback: ActivationCallback
}

/**
 * React state for {@link Tile}
 */
export interface TileComponentState {
	/** The {@link TileState} for this Tile */
	state: TileState
}

/**
 * A Tile component that holds a letter on the GameBoard
 *
 * @remarks Little more than a glorified button, but it has enough code to be worth splitting
 * into its own component.
 */
export class Tile extends Component<TileProps, TileComponentState> {
	elementRef: RefObject<Element | null> = createRef();

	/**
	 * @constructor
	 * @param props - The {@link TileProps | react props} passed to this Tile
	 */
	constructor(props: TileProps) {
		super(props);
		this.state = {state: TileState.Inactive};
	}

	/**
	 * Attempts to activate this tile
	 */
	activate = (): void => {
		this.setState({state: TileState.Active});

		let isActive: boolean = this.state.state !== TileState.Inactive;
		this.props.activationCallback(this.setGood, this.setBad, isActive);
	}

	/**
	 * Runs as soon as this component mounts in the DOM
	 */
	componentDidMount = (): void => {
		// Add event handlers on component mount
		const element: Element = this.elementRef.current!;
		element.addEventListener('click', this.activate);
	}

	/**
	 * Returns the css class that corresponds to the current Tile {@link TileState | state}
	 */
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

	/**
	 * Sets the Tile's {@link TileState | state} to {@link TileState.Bad | Bad},
	 * then {@link TileState.Inactive | Inactive} after a moment
	 */
	setBad = (): void => {
		this.setState({state: TileState.Bad});
		setTimeout(this.setInactive, TILE_GOOD_BAD_TIMEOUT_MS);
	}

	/**
	 * Sets the Tile's {@link TileState | state} to {@link TileState.Good | Good},
	 * then {@link TileState.Inactive | Inactive} after a moment
	 */
	setGood = (): void => {
		this.setState({state: TileState.Good});
		setTimeout(this.setInactive, TILE_GOOD_BAD_TIMEOUT_MS);
	}

	/**
	 * Sets the Tile's {@link TileState | state} to {@link TileState.Inactive | Inactive}
	 */
	setInactive = (): void => {
		this.setState({state: TileState.Inactive});
	}

	/**
	 * Renders the react component
	 */
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
