/**
 * A type that can have a value or not
 * @packageDocumentation
 */

/**
 * A type that can have a value or not
 */
export class Option<T> {
	hasValue: boolean;
	value: T | null;

	constructor(hasValue: boolean, value: T | null) {
		this.hasValue = hasValue;
		this.value = value;
	}

	/**
	 * Gets the value from this Option, otherwise run the callback and return null
	 *
	 * @param callback - Callback function to be run if this Option has no value
	 * @returns The value of this option, or runs the callback
	 */
	getElse = (callback: () => void): T | null => {
		if(this.isNone()) {
			callback();
		}

		return this.value;
	}

	/**
	 * @returns True if this Option has no value set
	 */
	isNone = (): boolean => !this.hasValue;

	/**
	 * @returns Whether or not this Option has a value set
	 */
	isSome = (): boolean => this.hasValue;

	/**
	 * Sets the value of this Option
	 *
	 * @param value - Value to set
	 */
	set = (value: T): void => {
		this.hasValue = true;
		this.value = value;
	}
}

/**
 * Create an Option with no value set
 * @returns an Option with no value set
 */
export function None<T>(): Option<T> {
	return new Option<T>(false, null);
};

/**
 * Create an Option with some value
 * @constructor
 * @param value - Value to be assigned
 * @returns An Option with a value
 */
export function Some<T>(value: T): Option<T> {
	return new Option(true, value);
}