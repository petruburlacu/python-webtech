module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.spec.json',
            diagnostics: true,
            stringifyContentPathRegex: '\\.html$',
            astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
        }
    },
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@assets/(.*)': '<rootDir>/src/assets/$1',
        '@core/(.*)': '<rootDir>/src/app/core/$1',
        '@env': '<rootDir>/src/environments/environment',
        '@src/(.*)': '<rootDir>/src/src/$1',
        '@state/(.*)': '<rootDir>/src/app/state/$1'
    }
};