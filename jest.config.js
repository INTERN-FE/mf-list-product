module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ["src/*/.{js,jsx}"],
	coveragePathIgnorePatterns: ["/src/App.jsx", "/src/index.js"],
	coverageDirectory: "coverage",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	verbose: true,
};
