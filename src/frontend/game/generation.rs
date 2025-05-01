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

/// Normalizes an array, but skews it slightly to account for floating point error
fn normalize_array(array: Vec<&u32>) -> Vec<f32> {
	// Normalization
	let sum = array.iter().fold(0, |a, b| a + *b);
	let scalar = 1.0 / (sum as f32);
	let mut normalized: Vec<f32> = array.iter().map(|n| **n as f32 * scalar).collect();

	// Skew it to make it sum to 1.0
	let sum = normalized.iter().fold(0.0, |a, b| a + *b);
	let error = 1.0 - sum;

	// Find the highest value to skew
	let mut highest_index = 0;
	let mut highest_value = 0.0;

	for (index, value) in normalized.iter().enumerate() {
		if *value > highest_value {
			highest_value = *value;
			highest_index = index;
		}
	}

	normalized[highest_index] += error;

	return normalized;
}
