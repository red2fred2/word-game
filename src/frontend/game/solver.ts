/**
 * Functions for automatic game solving
 * @packageDocumentation
 */


/**
 * A position on the board
 */
interface Position {
	x: number,
	y: number,
	letter: string,
}

/**
 * Gets a list of coordinates next to this one on the board
 * @remarks This function is going to be run an obscene number of times very quickly.
 * I'm making the classic mistake of optimizing early and letting it be repetitive.
 *
 * @param pos Position on the board to find neighbors for
 * @param board Game board
 * @returns List of {@link Position | Positions} that are neighbors
 */
function findNeighbors(pos: Position, board: string[][]): Position[]  {
	const x: number = pos.x;
	const y: number = pos.y;
	const size: number = board.length;

	const xLowerSide: boolean = x === 0;
	const xUpperSide: boolean = x === size - 1;
	const yLowerSide: boolean = y === 0;
	const yUpperSide: boolean = y === size - 1;

	const xMiddle: boolean = !(xLowerSide || xUpperSide);
	const yMiddle: boolean = !(yLowerSide || yUpperSide);

	if(xMiddle && yMiddle) {
		// Middle case
		return [
			{x: x - 1, y: y - 1, letter: board[x - 1][y - 1]}, {x: x, y: y - 1, letter:board[x][y - 1]}, {x: x + 1, y: y - 1, letter: board[x + 1][y - 1]},
			{x: x - 1, y: y,     letter: board[x - 1][y    ]}, /***************************************/ {x: x + 1, y: y,     letter: board[x + 1][y    ]},
			{x: x - 1, y: y + 1, letter: board[x - 1][y + 1]}, {x: x, y: y + 1, letter:board[x][y + 1]}, {x: x + 1, y: y + 1, letter: board[x + 1][y + 1]}
		];
	} else if(xLowerSide && yMiddle) {
		// Lower x side
		return [
			{x: x, y: y - 1, letter:board[x][y - 1]}, {x: x + 1, y: y - 1, letter: board[x + 1][y - 1]},
			/***************************************/ {x: x + 1, y: y    , letter: board[x + 1][y    ]},
			{x: x, y: y + 1, letter:board[x][y + 1]}, {x: x + 1, y: y + 1, letter: board[x + 1][y + 1]}
		];
	} else if(xUpperSide && yMiddle) {
		// Upper x side
		return [
			{x: x - 1, y: y - 1, letter: board[x - 1][y - 1]}, {x: x, y: y - 1, letter:board[x][y - 1]},
			{x: x - 1, y: y    , letter: board[x - 1][y    ]}, /***************************************/
			{x: x - 1, y: y + 1, letter: board[x - 1][y + 1]}, {x: x, y: y + 1, letter:board[x][y + 1]}
		];
	} else if(yLowerSide && xMiddle) {
		// Lower y side
		return [
			{x: x - 1, y: y    , letter: board[x - 1][y    ]}, /***************************************/ {x: x + 1, y: y    , letter: board[x + 1][y    ]},
			{x: x - 1, y: y + 1, letter: board[x - 1][y + 1]}, {x: x, y: y + 1, letter:board[x][y + 1]}, {x: x + 1, y: y + 1, letter: board[x + 1][y + 1]}
		];
	} else if(yUpperSide && xMiddle) {
		// Upper y side
		return [
			{x: x - 1, y: y - 1, letter: board[x - 1][y - 1]}, {x: x, y: y - 1, letter:board[x][y - 1]}, {x: x + 1, y: y - 1, letter: board[x + 1][y - 1]},
			{x: x - 1, y: y    , letter: board[x - 1][y    ]}, /***************************************/ {x: x + 1, y: y    , letter: board[x + 1][y    ]}
		];
	} else if(xLowerSide && yLowerSide) {
		// Lower xy corner
		return [
	        /***************************************/ {x: x + 1, y: y    , letter: board[x + 1][y    ]},
			{x: x, y: y + 1, letter:board[x][y + 1]}, {x: x + 1, y: y + 1, letter: board[x + 1][y + 1]}
		];
	} else if(xLowerSide && yUpperSide) {
		// Lower x upper y corner
		return [
			{x: x, y: y - 1, letter:board[x][y - 1]}, {x: x + 1, y: y - 1, letter: board[x + 1][y - 1]},
			/***************************************/ {x: x + 1, y: y    , letter: board[x + 1][y    ]}
		];
	} else if(xUpperSide && yUpperSide) {
		// Upper xy corner
		return [
			{x: x - 1, y: y - 1, letter: board[x - 1][y - 1]}, {x: x, y: y - 1, letter:board[x][y - 1]},
			{x: x - 1, y: y    , letter: board[x - 1][y    ]}  /***************************************/
		];
	} else if(xUpperSide && yLowerSide) {
		// Upper x lower y corner
		return [
			{x: x - 1, y: y    , letter: board[x - 1][y    ]}, /**************************************/
			{x: x - 1, y: y + 1, letter: board[x - 1][y + 1]}, {x: x, y: y + 1, letter:board[x][y + 1]}
		];
	} else {
		throw new Error("Unreachable");
	}
}

/**
 * Finds all possible solutions to a board
 * @remarks This is a very expensive operation, minimize its use.
 *
 * @param board NxN game board to analyze
 * @returns List of words included in the board
 */
export function solve(board: string[][]): string[] {
	throw new Error("Not implemented");
}