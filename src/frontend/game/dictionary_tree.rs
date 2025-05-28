use std::{boxed::Box, cell::RefCell, rc::Rc};

use const_gen::CompileConst;

#[allow(dead_code)]
#[derive(Debug)]
pub enum DictionaryTree<'a> {
	DeadEnd,
	PartOfWord(&'a[DictionaryTree<'a>; 26]),
	Word(&'a[DictionaryTree<'a>; 26]),
}

#[allow(unused)]
#[derive(Clone, Debug)]
pub enum DictionaryTreeBuilder {
	DeadEnd,
	PartOfWord(Rc<RefCell<Vec<Box<DictionaryTreeBuilder>>>>),
	Word(Rc<RefCell<Vec<Box<DictionaryTreeBuilder>>>>),
}

#[allow(unused)]
impl DictionaryTreeBuilder {
	/// Returns true if word is in the dictionary, false otherwise
	pub fn check_word(&self) -> bool {
		todo!()
	}

	/// Returns false if the letters hit a dead end, true otherwise
	pub fn check_word_part(&self) -> bool {
		todo!()
	}
}

#[allow(unused)]
impl DictionaryTreeBuilder {
	/// Creates a new empty dictionary
	pub fn new() -> DictionaryTreeBuilder {
		DictionaryTreeBuilder::DeadEnd
	}

	/// Adds a word to the dictionary
	pub fn add(&mut self, word: &[u8]) {
		let mut letters = self.get_letters();

		// If this is the end of a word, set it properly
		if word.len() == 0 {
			match self {
				DictionaryTreeBuilder::DeadEnd | DictionaryTreeBuilder::PartOfWord(_) | DictionaryTreeBuilder::Word(_) => {
					*self = DictionaryTreeBuilder::Word(letters);
					return;
				}
			}
		}

		// Split the word
		let (left, rest_of_word) = word.split_at(1);
		let first_letter = left[0];
		let letter_index = u8_to_letter_index(first_letter);

		// Add the first letter
		let mut subtree = &mut letters.borrow_mut()[letter_index];
		subtree.add(rest_of_word);

		match self {
			DictionaryTreeBuilder::DeadEnd | DictionaryTreeBuilder::PartOfWord(_) => {
				*self = DictionaryTreeBuilder::PartOfWord(letters.clone());
			},
			DictionaryTreeBuilder::Word(_) => {
				*self = DictionaryTreeBuilder::Word(letters.clone());
			}
		}
	}

	/// Get the letters under this tree, or a bunch of dead ends if this is a dead end
	fn get_letters(&mut self) -> Rc<RefCell<Vec<Box<DictionaryTreeBuilder>>>> {
		match self {
			DictionaryTreeBuilder::DeadEnd => {
				let mut l = Vec::new();

				for _ in 0..26 {
					let v = Box::new(DictionaryTreeBuilder::new());
					l.push(v);
				}

				return Rc::new(RefCell::new(l));
			},
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
			DictionaryTreeBuilder::DeadEnd => "DictionaryTree::DeadEnd".to_string(),
			DictionaryTreeBuilder::PartOfWord(letters) => stringify_letters(letters.clone(), "PartOfWord"),
			DictionaryTreeBuilder::Word(letters) => stringify_letters(letters.clone(), "Word"),
		}
	}
}

/// Turns the letters into a const sized slice reference
/// Only useful in const_val
fn stringify_letters(letters: Rc<RefCell<Vec<Box<DictionaryTreeBuilder>>>>, kind: &str) -> String {
	let l0 = letters.borrow()[0].const_val();
	let l1 = letters.borrow()[1].const_val();
	let l2 = letters.borrow()[2].const_val();
	let l3 = letters.borrow()[3].const_val();
	let l4 = letters.borrow()[4].const_val();
	let l5 = letters.borrow()[5].const_val();
	let l6 = letters.borrow()[6].const_val();
	let l7 = letters.borrow()[7].const_val();
	let l8 = letters.borrow()[8].const_val();
	let l9 = letters.borrow()[9].const_val();
	let l10 = letters.borrow()[10].const_val();
	let l11 = letters.borrow()[11].const_val();
	let l12 = letters.borrow()[12].const_val();
	let l13 = letters.borrow()[13].const_val();
	let l14 = letters.borrow()[14].const_val();
	let l15 = letters.borrow()[15].const_val();
	let l16 = letters.borrow()[16].const_val();
	let l17 = letters.borrow()[17].const_val();
	let l18 = letters.borrow()[18].const_val();
	let l19 = letters.borrow()[19].const_val();
	let l20 = letters.borrow()[20].const_val();
	let l21 = letters.borrow()[21].const_val();
	let l22 = letters.borrow()[22].const_val();
	let l23 = letters.borrow()[23].const_val();
	let l24 = letters.borrow()[24].const_val();
	let l25 = letters.borrow()[25].const_val();
	return format!("DictionaryTree::{kind}(&[{l0},{l1},{l2},{l3},{l4},{l5},{l6},{l7},{l8},{l9},{l10},{l11},{l12},{l13},{l14},{l15},{l16},{l17},{l18},{l19},{l20},{l21},{l22},{l23},{l24},{l25}])");
}

/// Finds the index for a u8 representing a letter
/// A and a are 0, B and b are 1 ...
/// Panics if the letter is not A-Za-z
pub const fn u8_to_letter_index(letter: u8) -> usize {
	if letter > 64 && letter < 91 {
		return (letter - 65) as usize;
	} else if letter > 96 && letter < 123 {
		return (letter - 97) as usize;
	} else {
		panic!();
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
