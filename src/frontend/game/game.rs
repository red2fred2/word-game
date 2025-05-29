#[path = "../../../prebuild/const_fns.rs"]
mod const_fns;

use wasm_bindgen::prelude::*;
use web_sys::{CustomEvent, CustomEventInit};

use crate::DICTIONARY_TREE;
use super::generation::{generate_letters, get_letter_values};
use const_fns::u8_to_letter_index;

const LETTER_VALUES: [u16; 26] = get_letter_values();

#[wasm_bindgen]
pub enum WordCheck {
	AlreadyFound,
	Found,
	NotFound
}

#[wasm_bindgen]
pub struct Game {
	letters: Vec<Vec<String>>,
	score: u32,
	#[allow(unused)]
	size: u8,
	words_found: Vec<String>,
}

#[wasm_bindgen]
impl Game {
	#[wasm_bindgen(constructor)]
	pub fn new(size: u8) -> Game {
		let letters = generate_letters(size);
		let score = 0;
		let words_found = Vec::new();
		Game {letters, score, size, words_found}
	}

	fn add_word_to_score(&mut self, word: &str) {
		let word_score = find_word_score(word);
		self.score += word_score as u32;

		let details = CustomEventInit::new();
		details.set_detail(&JsValue::from_f64(self.score as f64));
		let event = CustomEvent::new_with_event_init_dict("score-change", &details).unwrap();

		let window = web_sys::window().unwrap();
		let _ = window.dispatch_event(&event);
	}

	#[wasm_bindgen]
	pub fn check_word(&mut self, word: &str) -> WordCheck {
		let lowercase_word = word.to_lowercase();

		let already_found = self.words_found.contains(&lowercase_word);
		if already_found {
			return WordCheck::AlreadyFound;
		}

		let found_in_dictionary = DICTIONARY_TREE.check_word(word.as_bytes());
		if found_in_dictionary {
			self.words_found.push(lowercase_word);
			self.add_word_to_score(word);

			return WordCheck::Found;
		}

		return WordCheck::NotFound;
	}

	#[wasm_bindgen]
	pub fn get_letter(&self, row: usize, col: usize) -> String {
		return self.letters[row][col].clone();
	}
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
