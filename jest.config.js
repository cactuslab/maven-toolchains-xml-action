/* https://jestjs.io/docs/en/configuration */
export default {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	testPathIgnorePatterns: [
		'/node_modules/',
		'/dist/',
	],
	/* Only run files with test or spec in their filename, so we can have support files in __tests__ */
	testRegex: '(\\.|/)(test|spec)\\.[jt]sx?$',
	collectCoverage: true,
	coverageDirectory: 'coverage',
}
