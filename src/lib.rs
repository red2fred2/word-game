#![feature(ascii_char)]
#![feature(test)]

include!(concat!(env!("OUT_DIR"), "/constants.rs"));

use wasm_bindgen::prelude::*;
use wasm_log;

pub mod frontend;

use frontend::game::dictionary_tree::DictionaryTree;

#[wasm_bindgen(start)]
pub fn init() {
	wasm_log::init(wasm_log::Config::default());
}
