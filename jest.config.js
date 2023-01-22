const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
	roots: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'js', 'html'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	modulePaths: [compilerOptions.baseUrl]
};
