#[path = "prebuild/const_fns.rs"]
mod const_fns;
#[path = "src/frontend/game/dictionary.rs"]
mod dictionary;
#[path = "src/frontend/game/dictionary_tree.rs"]
mod dictionary_tree;

use std::{env, fs, path::Path};

use const_gen::*;

use const_fns::{count_letters, normalize_array};
use dictionary::DICTIONARY;
use dictionary_tree::{DictionaryTreeBuilder};

/// Gets the relative frequency of each letter in the dictionary
/// Will not work the way you think if not every letter shows up
const fn get_word_list_pdf() -> [f32; 26] {
	let counts = count_letters(&DICTIONARY);
	return normalize_array(&counts);
}

fn build_dictionary_tree() -> DictionaryTreeBuilder {
	let mut tree = DictionaryTreeBuilder::new();

	for word in DICTIONARY {
		tree.add(word.as_bytes());
	}

	return tree;
}

fn main() {
	let out_dir = env::var_os("OUT_DIR").unwrap();
    let dest_path = Path::new(&out_dir).join("constants.rs");

	let const_declarations = vec![
		const_declaration!(pub DICTIONARY_TREE = build_dictionary_tree()),
		const_declaration!(pub PDF = get_word_list_pdf()),
	].join("\n");

	fs::write(&dest_path, const_declarations).unwrap();
}
