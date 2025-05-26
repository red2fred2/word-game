include!(concat!(env!("OUT_DIR"), "/constants.rs"));

use rand::random;

const LETTERS: [char; 26] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

pub fn generate_letters(size: u8) -> Vec<Vec<String>> {
	let pdf = PDF.to_vec();
	let mut letters = Vec::new();

	for _ in 0..size {
		let mut row = Vec::new();

		for _ in 0..size {
			let letter = random_from_array_with_pdf(&LETTERS, &pdf);
			row.push(letter.to_string());
		}

		letters.push(row);
	}

	return letters;
}

pub const fn get_letter_values() -> [u16; 26] {
	let mut values = [0; 26];
	let mut i = 0;
	while i < 26 {
		values[i] = (1.0 / PDF[i]) as u16;
		i += 1;
	}

	return values;
}

/// Gets a random item from an array, using the probability distribution function
/// array for the probability of each item.
///
/// Both arrays must be the same size
fn random_from_array_with_pdf<T>(array: &[T], pdf: &[f32]) -> T
where T: Clone + Copy {
	// Line the PDF up and find where each element of the array would sit
	// Creates an ordered list from 0 to 1 with separation points marked

	let mut domain: Vec<f32> = vec![0.0];
	for (i, &p) in pdf.iter().enumerate() {
		domain.push(domain[i] + p);
	}

	// Find value
	let random = random::<f32>();
	let mut index: usize = 0;

	for i in (1..domain.len()).rev() {
		if random >= domain[i - 1] && random <= domain[i] {
			index = i - 1;
			break;
		}
	}

	return array[index];
}
