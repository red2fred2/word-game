/**
 * Holds functions that won't be packaged, but generate frequencies and dictionaries
 * @packageDocumentation
 */

import dictionary from './dictionary.json';

/**
 * Gets the relative frequency of each letter in the dictionary
 * @remarks typescript gets mad about importing the dictionary, so this is going to
 * be commented out when not in use
 */
function getWordlistPDF(): void {
	let count: Map<string, number> = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0], ['F', 0], ['G', 0], ['H', 0], ['I', 0], ['J', 0], ['K', 0], ['L', 0], ['M', 0], ['N', 0], ['O', 0], ['P', 0], ['Q', 0], ['R', 0], ['S', 0], ['T', 0], ['U', 0], ['V', 0], ['W', 0], ['X', 0], ['Y', 0], ['Z', 0]]);

	(dictionary as string[]).forEach((word: string) => {
		const w = word.toUpperCase();
		w.split('').forEach((letter: string) => {
			const c: number = count.get(letter)!;
			count.set(letter, c + 1);
		})
	});

	const frequencies = normalizeArray(Array.from(count.values()));
	console.log(frequencies);
}

/**
 * @param array - Array to normalize
 * @returns A normalized array
 */
function normalizeArray(array: number[]): number[] {
	const sum = array.reduce((a, b) => a + b);
	const scalar = 1 / sum;
	return array.map(n => n * scalar);
}
