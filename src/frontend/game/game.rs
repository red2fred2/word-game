use wasm_bindgen::prelude::*;

use super::generation::get_letter_values;

const LETTER_VALUES: [u16; 26] = get_letter_values();
