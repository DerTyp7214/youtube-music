const { test, expect } = require("@playwright/test");

const { sortSegments } = require("../segments");

test("Segment sorting", () => {
	expect(
		sortSegments([
			[0, 3],
			[7, 8],
			[5, 6],
		])
	).toEqual([
		[0, 3],
		[5, 6],
		[7, 8],
	]);

	expect(
		sortSegments([
			[0, 5],
			[6, 8],
			[4, 6],
		])
	).toEqual([[0, 8]]);

	expect(
		sortSegments([
			[0, 6],
			[7, 8],
			[4, 6],
		])
	).toEqual([
		[0, 6],
		[7, 8],
	]);
});
