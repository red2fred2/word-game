/**
 * The dictionary, but in tree form
 * @packageDocumentation
 */

import { None, Option, Some } from "../Option";

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
			this.rootNode = new DictionaryNode(Some(data));
		} else {
			this.rootNode = new DictionaryNode(None<DictionaryTreeData>());
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
	children: Option<DictionaryNode>[]

	constructor(data: Option<DictionaryTreeData>) {
		if(data.isNone()) {
			this.isWord = false;
			this.children = new Array(26).fill(None<DictionaryNode>());
		} else {
			const dat = data.value!;
			this.isWord = !!dat?._;

			const a = typeof(dat.a) !== 'undefined' ? Some(new DictionaryNode(Some(dat.a!))) : None<DictionaryNode>();
			const b = typeof(dat.b) !== 'undefined' ? Some(new DictionaryNode(Some(dat.b!))) : None<DictionaryNode>();
			const c = typeof(dat.c) !== 'undefined' ? Some(new DictionaryNode(Some(dat.c!))) : None<DictionaryNode>();
			const d = typeof(dat.d) !== 'undefined' ? Some(new DictionaryNode(Some(dat.d!))) : None<DictionaryNode>();
			const e = typeof(dat.e) !== 'undefined' ? Some(new DictionaryNode(Some(dat.e!))) : None<DictionaryNode>();
			const f = typeof(dat.f) !== 'undefined' ? Some(new DictionaryNode(Some(dat.f!))) : None<DictionaryNode>();
			const g = typeof(dat.g) !== 'undefined' ? Some(new DictionaryNode(Some(dat.g!))) : None<DictionaryNode>();
			const h = typeof(dat.h) !== 'undefined' ? Some(new DictionaryNode(Some(dat.h!))) : None<DictionaryNode>();
			const i = typeof(dat.i) !== 'undefined' ? Some(new DictionaryNode(Some(dat.i!))) : None<DictionaryNode>();
			const j = typeof(dat.j) !== 'undefined' ? Some(new DictionaryNode(Some(dat.j!))) : None<DictionaryNode>();
			const k = typeof(dat.k) !== 'undefined' ? Some(new DictionaryNode(Some(dat.k!))) : None<DictionaryNode>();
			const l = typeof(dat.l) !== 'undefined' ? Some(new DictionaryNode(Some(dat.l!))) : None<DictionaryNode>();
			const m = typeof(dat.m) !== 'undefined' ? Some(new DictionaryNode(Some(dat.m!))) : None<DictionaryNode>();
			const n = typeof(dat.n) !== 'undefined' ? Some(new DictionaryNode(Some(dat.n!))) : None<DictionaryNode>();
			const o = typeof(dat.o) !== 'undefined' ? Some(new DictionaryNode(Some(dat.o!))) : None<DictionaryNode>();
			const p = typeof(dat.p) !== 'undefined' ? Some(new DictionaryNode(Some(dat.p!))) : None<DictionaryNode>();
			const q = typeof(dat.q) !== 'undefined' ? Some(new DictionaryNode(Some(dat.q!))) : None<DictionaryNode>();
			const r = typeof(dat.r) !== 'undefined' ? Some(new DictionaryNode(Some(dat.r!))) : None<DictionaryNode>();
			const s = typeof(dat.s) !== 'undefined' ? Some(new DictionaryNode(Some(dat.s!))) : None<DictionaryNode>();
			const t = typeof(dat.t) !== 'undefined' ? Some(new DictionaryNode(Some(dat.t!))) : None<DictionaryNode>();
			const u = typeof(dat.u) !== 'undefined' ? Some(new DictionaryNode(Some(dat.u!))) : None<DictionaryNode>();
			const v = typeof(dat.v) !== 'undefined' ? Some(new DictionaryNode(Some(dat.v!))) : None<DictionaryNode>();
			const w = typeof(dat.w) !== 'undefined' ? Some(new DictionaryNode(Some(dat.w!))) : None<DictionaryNode>();
			const x = typeof(dat.x) !== 'undefined' ? Some(new DictionaryNode(Some(dat.x!))) : None<DictionaryNode>();
			const y = typeof(dat.y) !== 'undefined' ? Some(new DictionaryNode(Some(dat.y!))) : None<DictionaryNode>();
			const z = typeof(dat.z) !== 'undefined' ? Some(new DictionaryNode(Some(dat.z!))) : None<DictionaryNode>();

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
		let childNode: Option<DictionaryNode> = this.children[firstLetterIndex];
		if(childNode.isNone()) {
			child = new DictionaryNode(None<DictionaryTreeData>());
		} else {
			child = childNode.value!;
		}

		if (nextPart.length === 0) {
			child.isWord = true;
		} else {
			child.add(nextPart);
		}

		this.children[firstLetterIndex] = Some(child);
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

		if(child.isNone()) {
			return false;
		}

		if(nextPart.length === 0) {
			return child.value?.isWord!;
		} else {
			return child.value?.includes(nextPart)!;
		}
	}

	/**
	 * @returns This DictionaryTree in a compact form suitable for JSON stringifying
	 */
	save = (): DictionaryTreeData => {
		let data: DictionaryTreeData = {};
		if(this.isWord) data._ = 1;

		if(this.children[0].isSome()) data.a = this.children[0].value!.save();
		if(this.children[1].isSome()) data.b = this.children[1].value!.save();
		if(this.children[2].isSome()) data.c = this.children[2].value!.save();
		if(this.children[3].isSome()) data.d = this.children[3].value!.save();
		if(this.children[4].isSome()) data.e = this.children[4].value!.save();
		if(this.children[5].isSome()) data.f = this.children[5].value!.save();
		if(this.children[6].isSome()) data.g = this.children[6].value!.save();
		if(this.children[7].isSome()) data.h = this.children[7].value!.save();
		if(this.children[8].isSome()) data.i = this.children[8].value!.save();
		if(this.children[9].isSome()) data.j = this.children[9].value!.save();
		if(this.children[10].isSome()) data.k = this.children[10].value!.save();
		if(this.children[11].isSome()) data.l = this.children[11].value!.save();
		if(this.children[12].isSome()) data.m = this.children[12].value!.save();
		if(this.children[13].isSome()) data.n = this.children[13].value!.save();
		if(this.children[14].isSome()) data.o = this.children[14].value!.save();
		if(this.children[15].isSome()) data.p = this.children[15].value!.save();
		if(this.children[16].isSome()) data.q = this.children[16].value!.save();
		if(this.children[17].isSome()) data.r = this.children[17].value!.save();
		if(this.children[18].isSome()) data.s = this.children[18].value!.save();
		if(this.children[19].isSome()) data.t = this.children[19].value!.save();
		if(this.children[20].isSome()) data.u = this.children[20].value!.save();
		if(this.children[21].isSome()) data.v = this.children[21].value!.save();
		if(this.children[22].isSome()) data.w = this.children[22].value!.save();
		if(this.children[23].isSome()) data.x = this.children[23].value!.save();
		if(this.children[24].isSome()) data.y = this.children[24].value!.save();
		if(this.children[25].isSome()) data.z = this.children[25].value!.save();

		return data;
	}
}
