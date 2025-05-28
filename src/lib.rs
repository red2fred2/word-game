#![feature(ascii_char)]
#![feature(test)]

use wasm_bindgen::prelude::*;
use wasm_log;

pub mod frontend;

#[wasm_bindgen(start)]
pub fn init() {
	wasm_log::init(wasm_log::Config::default());
}
