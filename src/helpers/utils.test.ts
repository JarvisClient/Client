import {
	assert, test, describe
} from "vitest";
import { deepEqual } from "./utils";

describe("deepEqual", () => {
	test("deepEqual should return true for equal primitive values", () => {
		const result = deepEqual(42, 42);
		assert.isTrue(result);
	});

	test("deepEqual should return false for different primitive values", () => {
		const result = deepEqual(42, 43);
		assert.isFalse(result);
	});

	test("deepEqual should return true for equal objects", () => {
		const obj1 = { name: "Alice", age: 30 };
		const obj2 = { name: "Alice", age: 30 };
		const result = deepEqual(obj1, obj2);
		assert.isTrue(result);
	});

	test("deepEqual should return false for different objects", () => {
		const obj1 = { name: "Alice", age: 30 };
		const obj2 = { name: "Bob", age: 30 };
		const result = deepEqual(obj1, obj2);
		assert.isFalse(result);
	});

	test("deepEqual should return true for equal nested objects", () => {
		const obj1 = { name: "Alice", address: { city: "New York" } };
		const obj2 = { name: "Alice", address: { city: "New York" } };
		const result = deepEqual(obj1, obj2);
		assert.isTrue(result);
	});

	test("deepEqual should return false for different nested objects", () => {
		const obj1 = { name: "Alice", address: { city: "New York" } };
		const obj2 = { name: "Alice", address: { city: "Los Angeles" } };
		const result = deepEqual(obj1, obj2);
		assert.isFalse(result);
	});
});
