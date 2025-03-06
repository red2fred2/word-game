/**
 * Contains functions related to game board generation
 * @packageDocumentation
 */

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Qu', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LETTER_PDF = [0.07832111657796968, 0.02008233758409479, 0.04016467516818958, 0.0381564414097801, 0.11045285671252124, 0.014057636308866353, 0.03012350637614218, 0.023094688221709007, 0.08635405161160759, 0.0021086454463299527, 0.009739933728285972, 0.05321819459785119, 0.027111155738527966, 0.07229641530274124, 0.061251129631489105, 0.028115272617732705, 0.001907822070489005, 0.07330053218194597, 0.08735816849081232, 0.06727583090671754, 0.0331358570137564, 0.010041168792047394, 0.00913746360076313, 0.0027111155738527965, 0.01606587006727583, 0.004418114268500854];

export interface GenerationOptions {
	/** The size of the board to be generated: size X size */
	boardSize: number
}

/**
* Generates the letters
*/
export function generateLetters(options: GenerationOptions): string[][] {
   return Array.from(Array(options.boardSize).keys()).map(_ => {
	   return Array.from(Array(options.boardSize).keys()).map(_ => {
		   return randomFromArrayWithPDF(LETTERS, LETTER_PDF);
	   });
   });
}

/**
 * Gets a random item from an array, using the probability distribution function
 * array for the probability of each item.
 *
 * @remarks Each number in the PDF must be between 0 and 1, and every number in
 * the PDF array must sum to 1
 *
 * @param array - Array of values to choose from
 * @param pdf - Probability of each value to be chosen between 0 and 1
 */
function randomFromArrayWithPDF<T>(array: T[], pdf: number[]): T {
	// Check that the PDF numbers are in the right range
	const pdfInRange: boolean = pdf.every(v => v >= 0 && v <= 1);
	if(!pdfInRange) throw new Error('PDF array values are not all between 0 and 1');

	// Line the PDF up and find where each element of the array would sit
	// Creates an ordered list from 0 to 1 with separation points marked
	let domain: number[] = [0];
	pdf.forEach((p, i) => domain.push(domain[i] + p));

	// Check that the numbers sum to 1
	const lastDomain: number = domain[domain.length - 1];
	if(lastDomain != 1) throw new Error(`PDF array sums to ${lastDomain}, not 1`);

	// Find value
	const random = Math.random();
	let index: number = -1;

	for(let i = domain.length - 1; i > 0; i--) {
		if(random >= domain[i-1] && random <= domain[i]) {
			index = i - 1;
			break;
		}
	}

	return array[index];
}

function normalizeArray(array: number[]): number[] {
	const sum = array.reduce((a, b) => a + b);
	const scalar = 1 / sum;
	return array.map(n => n * scalar);
}
