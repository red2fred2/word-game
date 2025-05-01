/// Counts how many of each letter exists in the dictionary
pub const fn count_letters<const N: usize>(dictionary: &[&str; N]) -> [u32; 26] {
	let mut counts = [0; 26];
	let mut i = 0;

	while i < N {
		let mut j = 0;
		let word = dictionary[i];
		let word = word.as_bytes();
		let word_length = word.len();

		while j < word_length {
			let code = word[j];
			let index;
			if code > 64 && code < 91 {
				index = code - 65;
			} else if code > 96 && code < 123 {
				index = code - 97;
			} else {
				panic!();
			}

			counts[index as usize] += 1;
			j += 1;
		}

		i += 1;
	}

	return counts;
}

pub const fn normalize_array<const N: usize>(array: &[u32; N]) -> [f32; N] {
	let sum = sum_u32(array);
	let scalar = 1.0 / (sum as f32);

	let mut i = 0;
	let mut normalized = [0.0; N];

	while i < N {
		let value = array[i] as f32;
		let scaled = value * scalar;
		normalized[i] = scaled;

		i += 1;
	}

	return normalized;
}

pub const fn sum_u32<const N: usize>(array: &[u32; N]) -> u32 {
	let mut i = 0;
	let mut sum = 0;

	while i < N {
		let value = array[i];
		sum += value;
		i += 1;
	}

	return sum;
}
