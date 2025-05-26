#[path = "prebuild/const_fns.rs"]
mod const_fns;
#[path = "prebuild/dictionary.rs"]
mod dictionary;

use std::{env, fs, path::Path};

use const_gen::*;

use const_fns::{count_letters, normalize_array};
use dictionary::DICTIONARY;

/// Gets the relative frequency of each letter in the dictionary
/// Will not work the way you think if not every letter shows up
const fn get_word_list_pdf() -> [f32; 26] {
	let counts = count_letters(&DICTIONARY);
	return normalize_array(&counts);
}

fn main() {
	let out_dir = env::var_os("OUT_DIR").unwrap();
    let dest_path = Path::new(&out_dir).join("constants.rs");

	let const_declarations = vec![
		const_declaration!(PDF = get_word_list_pdf()),
	].join("\n");

	fs::write(&dest_path, const_declarations).unwrap();
}
