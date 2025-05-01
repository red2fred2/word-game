pub const fn normalize_array<const N: usize>(array: &[u32; N]) -> [f32; N] {
	let sum = sum_u32(array);
	let scalar = 1.0 / (sum as f32);

	let mut i = 0;
	let mut normalized = [0.0; N];

	loop {
		if i == N {break;}

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

	loop {
		if i == N {break;}

		let value = array[i];
		sum += value;
		i += 1;
	}

	return sum;
}
