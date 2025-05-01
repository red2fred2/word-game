pub const fn sum<const N: usize>(array: &[u32; N]) -> u32 {
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
