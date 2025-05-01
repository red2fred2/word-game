use std::collections::HashMap;

use js_sys::{ Array, JsString };
use rand::random;
use wasm_bindgen::prelude::*;

use super::{const_fns::normalize_array, dictionary::DICTIONARY};

const LETTERS: [char; 26] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

#[wasm_bindgen]
pub fn generate_letters(size: u8) -> Array {
	wasm_log::init(wasm_log::Config::default());
	let pdf = get_word_list_pdf();
	let mut letters = Vec::new();

	for _ in 0..size {
		let mut row = Vec::new();

		for _ in 0..size {
			let letter = random_from_array_with_pdf(&LETTERS, &pdf);
			row.push(letter.to_string());
		}

		letters.push(row);
	}

	return vecvec_to_js_arrayarray(&letters);
}

/// Gets the relative frequency of each letter in the dictionary
/// Will not work the way you think if not every letter shows up
fn get_word_list_pdf() -> Vec<f32> {
	// Count up the letters
	let mut counts: HashMap<char, u32> = HashMap::new();

	for word in DICTIONARY {
		let w = word.to_uppercase();

		for letter in w.chars() {
			*counts.entry(letter).or_insert(0) += 1;
		}
	}

	// Plonk them into an array in order
	let mut values = [0; 26];

	for (i, letter) in LETTERS.iter().enumerate() {
		let value = *counts.get(&letter).unwrap();
		values[i] = value;
	}

	// Normalize the data
	return normalize_array(&values).to_vec();
}

/// Gets a random item from an array, using the probability distribution function
/// array for the probability of each item.
///
/// Both arrays must be the same size
fn random_from_array_with_pdf<T>(array: &[T], pdf: &[f32]) -> T
where T: Clone + Copy {
	// Line the PDF up and find where each element of the array would sit
	// Creates an ordered list from 0 to 1 with separation points marked

	let mut domain: Vec<f32> = vec![0.0];
	for (i, &p) in pdf.iter().enumerate() {
		domain.push(domain[i] + p);
	}

	// Find value
	let random = random::<f32>();
	let mut index: usize = 0;

	for i in (1..domain.len()).rev() {
		if random >= domain[i - 1] && random <= domain[i] {
			index = i - 1;
			break;
		}
	}

	return array[index];
}

fn vecvec_to_js_arrayarray(vec: &Vec<Vec<String>>) -> Array {
	let array_0 = Array::new();
	for e_0 in vec {
		let array_1 = Array::new();

		for e_1 in e_0 {
			let js_e = JsString::from(e_1.clone());

			array_1.push(&js_e);
		}

		array_0.push(&array_1);
	}

	return array_0;
}
