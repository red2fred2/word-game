use std::collections::HashMap;

use log;
use wasm_bindgen::prelude::*;
use wasm_log;

use super::dictionary::DICTIONARY;

const LETTERS: [char; 26] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/// Gets the relative frequency of each letter in the dictionary
/// Will not work the way you think if not every letter shows up
fn get_word_list_pdf() -> Vec<f32> {
	// Count up the letters
	let mut counts = HashMap::new();

	for word in DICTIONARY {
		let w = word.to_uppercase();

		for letter in w.chars() {
			*counts.entry(letter).or_insert(0) += 1;
		}
	}

	// Plonk them into an array in order
	let mut values = Vec::new();

	for letter in LETTERS {
		let value = counts.get(&letter).unwrap();
		values.push(value);
	}

	log::info!("{values:?}");

	// Normalize the data
	return normalize_array(values);
}

fn normalize_array(array: Vec<&u32>) -> Vec<f32> {
	// Normalization
	let sum = array.iter().fold(0, |a, b| a + *b);
	let scalar = 1.0 / (sum as f32);

	return array.iter().map(|n| **n as f32 * scalar).collect();
}
