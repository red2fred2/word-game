use std::{boxed::Box, cell::RefCell, collections::HashMap, rc::Rc};

use const_gen::CompileConst;
use phf::Map;

#[allow(dead_code)]
#[derive(Debug)]
pub enum DictionaryTree {
	PartOfWord(Map<u8, DictionaryTree>),
	Word(Map<u8, DictionaryTree>),
}

#[allow(unused)]
impl DictionaryTree {
	/// Returns true if word is in the dictionary, false otherwise
	pub fn check_word(&self, word: &[u8]) -> bool {
		let letters;

		match self {
			DictionaryTree::PartOfWord(l) => {
				if word.len() == 0 {return false}
				letters = l;
			},
			DictionaryTree::Word(l) => {
				if word.len() == 0 {return true}
				letters = l;
			},
		}

		let (left, rest_of_word) = word.split_at(1);
		let first_letter = left[0];

		let Some(subtree) = letters.get(&first_letter) else {
			return false;
		};

		return subtree.check_word(rest_of_word);
	}

	/// Returns false if the letters hit a dead end, true otherwise
	pub fn check_word_part(&self, word: &[u8]) -> bool {
		todo!()
	}
}


#[allow(unused)]
#[derive(Clone, Debug)]
pub enum DictionaryTreeBuilder {
	PartOfWord(Rc<RefCell<HashMap<u8, Box<DictionaryTreeBuilder>>>>),
	Word(Rc<RefCell<HashMap<u8, Box<DictionaryTreeBuilder>>>>),
}

#[allow(unused)]
impl DictionaryTreeBuilder {
	/// Creates a new empty dictionary
	pub fn new() -> DictionaryTreeBuilder {
		let letters = Rc::new(RefCell::new(HashMap::new()));
		return DictionaryTreeBuilder::PartOfWord(letters);
	}

	/// Adds a word to the dictionary
	pub fn add(&mut self, word: &[u8]) {
		let mut letters = self.get_letters();

		// If this is the end of a word, set it properly
		if word.len() == 0 {
			*self = DictionaryTreeBuilder::Word(letters);
			return;
		}

		// Split the word
		let (left, rest_of_word) = word.split_at(1);
		let first_letter = left[0];

		// Add the first letter
		let mut letters_ref = letters.borrow_mut();
		let mut subtree = letters_ref.get_mut(&first_letter);
		if let Some(subtree) = subtree {
			subtree.add(rest_of_word);
		} else {
			let mut new_tree = Box::new(DictionaryTreeBuilder::new());
			new_tree.add(rest_of_word);
			letters_ref.insert(first_letter, new_tree);
		}
	}

	/// Get the letters under this tree, or a bunch of dead ends if this is a dead end
	fn get_letters(&mut self) -> Rc<RefCell<HashMap<u8, Box<DictionaryTreeBuilder>>>> {
		match self {
			DictionaryTreeBuilder::PartOfWord(l) | DictionaryTreeBuilder::Word(l) => {
				return l.clone();
			},
		}
	}
}

impl CompileConst for DictionaryTreeBuilder {
	fn const_type() -> String {
		"DictionaryTree".to_string()
	}

	fn const_val(&self) -> String {
		match self {
			DictionaryTreeBuilder::PartOfWord(letters) => {
				let letter_string = letters.borrow().const_val();
				return format!("DictionaryTree::PartOfWord({letter_string})");
			},
			DictionaryTreeBuilder::Word(letters) => {
				let letter_string = letters.borrow().const_val();
				return format!("DictionaryTree::Word({letter_string})");
			},
		}
	}
}

#[cfg(test)]
mod tests {
	extern crate test;

	use super::*;
	use test::Bencher;
	use super::super::dictionary::DICTIONARY;

	#[bench]
	fn dictionary_tree_bench_add_long(b: &mut Bencher) {
		b.iter(|| {
			let mut tree = DictionaryTreeBuilder::new();
			tree.add("gubernatorial".as_bytes());
		})
	}

	#[bench]
	fn dictionary_tree_bench_add_short(b: &mut Bencher) {
		b.iter(|| {
			let mut tree = DictionaryTreeBuilder::new();
			tree.add("cat".as_bytes());
		})
	}

	#[bench]
	fn dictionary_tree_bench_add_10_nonconcurrent(b: &mut Bencher) {
		b.iter(|| {
			let mut tree = DictionaryTreeBuilder::new();
			tree.add("azimuth".as_bytes());
			tree.add("battery".as_bytes());
			tree.add("colossal".as_bytes());
			tree.add("derrick".as_bytes());
			tree.add("europe".as_bytes());
			tree.add("france".as_bytes());
			tree.add("gunsmith".as_bytes());
			tree.add("hotelier".as_bytes());
			tree.add("indigo".as_bytes());
			tree.add("johnson".as_bytes());
		})
	}

	#[bench]
	fn dictionary_tree_bench_add_10_concurrent(b: &mut Bencher) {
		b.iter(|| {
			let mut tree = DictionaryTreeBuilder::new();
			let mut n = 0;

			for word in DICTIONARY {
				if n > 10 {
					break;
				}
				tree.add(word.as_bytes());
				n += 1;
			}
		})
	}

	#[bench]
	fn dictionary_tree_bench_add_100_concurrent(b: &mut Bencher) {
		b.iter(|| {
			let mut tree = DictionaryTreeBuilder::new();
			let mut n = 0;

			for word in DICTIONARY {
				if n > 100 {
					break;
				}
				tree.add(word.as_bytes());
				n += 1;
			}
		})
	}

	#[bench]
	fn dictionary_tree_bench_add_1000_concurrent(b: &mut Bencher) {
		b.iter(|| {
			let mut tree = DictionaryTreeBuilder::new();
			let mut n = 0;

			for word in DICTIONARY {
				if n > 1000 {
					break;
				}
				tree.add(word.as_bytes());
				n += 1;
			}
		})
	}

	#[bench]
	fn dictionary_tree_bench_add_10000_concurrent(b: &mut Bencher) {
		b.iter(|| {
			let mut tree = DictionaryTreeBuilder::new();
			let mut n = 0;

			for word in DICTIONARY {
				if n > 10000 {
					break;
				}
				tree.add(word.as_bytes());
				n += 1;
			}
		})
	}

	#[bench]
	fn dictionary_tree_bench_get_letters_100_words(b: &mut Bencher) {
		let mut tree = DictionaryTreeBuilder::new();
		let mut n = 0;

		for word in DICTIONARY {
			if n > 100 {
				break;
			}
			tree.add(word.as_bytes());
			n += 1;
		}

		b.iter(|| {
			tree.get_letters();
		})
	}

	#[bench]
	fn dictionary_tree_bench_get_letters_1000_words(b: &mut Bencher) {
		let mut tree = DictionaryTreeBuilder::new();
		let mut n = 0;

		for word in DICTIONARY {
			if n > 1000 {
				break;
			}
			tree.add(word.as_bytes());
			n += 1;
		}

		b.iter(|| {
			tree.get_letters();
		})
	}
}
