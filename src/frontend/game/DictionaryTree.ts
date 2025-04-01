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
	constructor() {
		this.rootNode = new DictionaryNode();
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
}

/**
 * A single node in the dictionary tree
 */
class DictionaryNode {
	isWord: boolean
	children: (DictionaryNode | null)[]

	constructor() {
		this.isWord = false;
		this.children = new Array(26).fill(null);
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
			child = new DictionaryNode();
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
}
