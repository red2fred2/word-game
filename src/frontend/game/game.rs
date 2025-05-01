use wasm_bindgen::prelude::*;

use super::dictionary::DICTIONARY;

#[wasm_bindgen]
extern "C" {
	pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
	let length = DICTIONARY.len();
	alert(&format!("{length}"));
}
