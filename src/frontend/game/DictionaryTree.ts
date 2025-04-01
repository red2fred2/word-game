/**
 * The dictionary, but in tree form
 * @packageDocumentation
 */

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/**
 * Minimized save format for the dictionary tree to be JSON stringified
 */
export interface DictionaryTreeData {
	_?: number,
	a?: DictionaryTreeData,
	b?: DictionaryTreeData,
	c?: DictionaryTreeData,
	d?: DictionaryTreeData,
	e?: DictionaryTreeData,
	f?: DictionaryTreeData,
	g?: DictionaryTreeData,
	h?: DictionaryTreeData,
	i?: DictionaryTreeData,
	j?: DictionaryTreeData,
	k?: DictionaryTreeData,
	l?: DictionaryTreeData,
	m?: DictionaryTreeData,
	n?: DictionaryTreeData,
	o?: DictionaryTreeData,
	p?: DictionaryTreeData,
	q?: DictionaryTreeData,
	r?: DictionaryTreeData,
	s?: DictionaryTreeData,
	t?: DictionaryTreeData,
	u?: DictionaryTreeData,
	v?: DictionaryTreeData,
	w?: DictionaryTreeData,
	x?: DictionaryTreeData,
	y?: DictionaryTreeData,
	z?: DictionaryTreeData
}

/**
 * Represents a dictionary in a tree format
 */
export class DictionaryTree {
	rootNode: DictionaryNode;

	/**
	 * Creates a new DictionaryTree
	 * @param data Optional data to load from file
	 */
	constructor(data?: DictionaryTreeData) {
		if(typeof(data) !== 'undefined') {
			this.rootNode = new DictionaryNode(data);
		} else {
			this.rootNode = new DictionaryNode(null);
		}
	}

	/**
	 * Adds part of a word to this node
	 * @param word - Word part to add
	 */
	add = (word: string) =>
		this.rootNode.add(word.toUpperCase());

	/**
	 * @param word - Word to be checked
	 * @returns true if the word is in the dictionary
	 */
	includes = (word: string) =>
		this.rootNode.includes(word.toUpperCase());

	/**
	 * @returns This DictionaryTree in a compact form suitable for JSON stringifying
	 */
	save = (): DictionaryTreeData =>
		this.rootNode.save();
}

/**
 * A single node in the dictionary tree
 */
class DictionaryNode {
	isWord: boolean
	children: (DictionaryNode | null)[]

	constructor(data: DictionaryTreeData | null) {
		if(data === null) {
			this.isWord = false;
			this.children = new Array(26).fill(null);
		} else {
			const dat = data!;
			this.isWord = !!dat?._;

			const a = typeof(dat.a) !== 'undefined' ? new DictionaryNode(dat.a!) : null;
			const b = typeof(dat.b) !== 'undefined' ? new DictionaryNode(dat.b!) : null;
			const c = typeof(dat.c) !== 'undefined' ? new DictionaryNode(dat.c!) : null;
			const d = typeof(dat.d) !== 'undefined' ? new DictionaryNode(dat.d!) : null;
			const e = typeof(dat.e) !== 'undefined' ? new DictionaryNode(dat.e!) : null;
			const f = typeof(dat.f) !== 'undefined' ? new DictionaryNode(dat.f!) : null;
			const g = typeof(dat.g) !== 'undefined' ? new DictionaryNode(dat.g!) : null;
			const h = typeof(dat.h) !== 'undefined' ? new DictionaryNode(dat.h!) : null;
			const i = typeof(dat.i) !== 'undefined' ? new DictionaryNode(dat.i!) : null;
			const j = typeof(dat.j) !== 'undefined' ? new DictionaryNode(dat.j!) : null;
			const k = typeof(dat.k) !== 'undefined' ? new DictionaryNode(dat.k!) : null;
			const l = typeof(dat.l) !== 'undefined' ? new DictionaryNode(dat.l!) : null;
			const m = typeof(dat.m) !== 'undefined' ? new DictionaryNode(dat.m!) : null;
			const n = typeof(dat.n) !== 'undefined' ? new DictionaryNode(dat.n!) : null;
			const o = typeof(dat.o) !== 'undefined' ? new DictionaryNode(dat.o!) : null;
			const p = typeof(dat.p) !== 'undefined' ? new DictionaryNode(dat.p!) : null;
			const q = typeof(dat.q) !== 'undefined' ? new DictionaryNode(dat.q!) : null;
			const r = typeof(dat.r) !== 'undefined' ? new DictionaryNode(dat.r!) : null;
			const s = typeof(dat.s) !== 'undefined' ? new DictionaryNode(dat.s!) : null;
			const t = typeof(dat.t) !== 'undefined' ? new DictionaryNode(dat.t!) : null;
			const u = typeof(dat.u) !== 'undefined' ? new DictionaryNode(dat.u!) : null;
			const v = typeof(dat.v) !== 'undefined' ? new DictionaryNode(dat.v!) : null;
			const w = typeof(dat.w) !== 'undefined' ? new DictionaryNode(dat.w!) : null;
			const x = typeof(dat.x) !== 'undefined' ? new DictionaryNode(dat.x!) : null;
			const y = typeof(dat.y) !== 'undefined' ? new DictionaryNode(dat.y!) : null;
			const z = typeof(dat.z) !== 'undefined' ? new DictionaryNode(dat.z!) : null;

			this.children = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z];
		}
	}

	/**
	 * Adds part of a word to this node
	 * @param word - Word part to add
	 */
	add = (word: string) => {
		const firstLetter: string = word[0];
		const nextPart: string = word.substring(1);
		const firstLetterIndex: number = LETTERS.findIndex(l => l == firstLetter);

		let child: DictionaryNode;
		let childNode: DictionaryNode | null = this.children[firstLetterIndex];
		if(childNode === null) {
			child = new DictionaryNode(null);
		} else {
			child = childNode!;
		}

		if (nextPart.length === 0) {
			child.isWord = true;
		} else {
			child.add(nextPart);
		}

		this.children[firstLetterIndex] = child;
	}

	/**
	 * @param word - Word to be checked
	 * @returns true if the word is in the dictionary
	 */
	includes = (word: string): boolean => {
		const firstLetter: string = word[0];
		const nextPart: string = word.substring(1);
		const firstLetterIndex: number = LETTERS.findIndex(l => l == firstLetter);

		let child = this.children[firstLetterIndex];

		if(child === null) {
			return false;
		}

		if(nextPart.length === 0) {
			return child?.isWord!;
		} else {
			return child?.includes(nextPart)!;
		}
	}

	/**
	 * @returns This DictionaryTree in a compact form suitable for JSON stringifying
	 */
	save = (): DictionaryTreeData => {
		let data: DictionaryTreeData = {};
		if(this.isWord) data._ = 1;

		if(this.children[0] !== null) data.a = this.children[0]!.save();
		if(this.children[1] !== null) data.b = this.children[1]!.save();
		if(this.children[2] !== null) data.c = this.children[2]!.save();
		if(this.children[3] !== null) data.d = this.children[3]!.save();
		if(this.children[4] !== null) data.e = this.children[4]!.save();
		if(this.children[5] !== null) data.f = this.children[5]!.save();
		if(this.children[6] !== null) data.g = this.children[6]!.save();
		if(this.children[7] !== null) data.h = this.children[7]!.save();
		if(this.children[8] !== null) data.i = this.children[8]!.save();
		if(this.children[9] !== null) data.j = this.children[9]!.save();
		if(this.children[10] !== null) data.k = this.children[10]!.save();
		if(this.children[11] !== null) data.l = this.children[11]!.save();
		if(this.children[12] !== null) data.m = this.children[12]!.save();
		if(this.children[13] !== null) data.n = this.children[13]!.save();
		if(this.children[14] !== null) data.o = this.children[14]!.save();
		if(this.children[15] !== null) data.p = this.children[15]!.save();
		if(this.children[16] !== null) data.q = this.children[16]!.save();
		if(this.children[17] !== null) data.r = this.children[17]!.save();
		if(this.children[18] !== null) data.s = this.children[18]!.save();
		if(this.children[19] !== null) data.t = this.children[19]!.save();
		if(this.children[20] !== null) data.u = this.children[20]!.save();
		if(this.children[21] !== null) data.v = this.children[21]!.save();
		if(this.children[22] !== null) data.w = this.children[22]!.save();
		if(this.children[23] !== null) data.x = this.children[23]!.save();
		if(this.children[24] !== null) data.y = this.children[24]!.save();
		if(this.children[25] !== null) data.z = this.children[25]!.save();

		return data;
	}
}
