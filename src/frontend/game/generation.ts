/**
 * Contains functions related to game board generation
 * @packageDocumentation
 */

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Qu', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LETTER_PDF = [0.08463913513760994, 0.018296486639615868, 0.043775360120870126, 0.03238884469447671, 0.1077220673828069, 0.011227987844311034, 0.023643215649018785, 0.02643146972809944, 0.0895672254239325, 0.0015612391477282481, 0.007672849433135126, 0.05577509686206955, 0.030103929996051115, 0.07194748559230368, 0.07199441433501398, 0.03252362175433375, 0.0016834255692971562, 0.07043288903641555, 0.0716178397898508, 0.06607051902044833, 0.03762740867494978, 0.009464440031362134, 0.006411782548230729, 0.0030025810808490664, 0.020195956115902546, 0.004222728391317038];

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
