use wasm_bindgen::prelude::*;

use super::{const_fns::u8_to_letter_index, generation::get_letter_values};

const LETTER_VALUES: [u16; 26] = get_letter_values();

#[wasm_bindgen]
pub enum WordCheck {
	AlreadyFound,
	Found,
	NotFound
}

#[wasm_bindgen]
pub fn find_word_score(word: &str) -> u16 {
	let mut score = 0;

	for letter in word.as_bytes() {
		let index = u8_to_letter_index(*letter);
		score += LETTER_VALUES[index];
	}

	return score;
}
