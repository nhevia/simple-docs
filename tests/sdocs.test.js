import { parseIndex, parseDescription, sanitizeIndexText } from '../sdocs'

describe('parsers', () => {

    describe('parseDescription', () => {
        test('it should return the input parsed', () => {
            const input = [
                { filename: 'test file name', data: 'test data' },
            ]

            expect(parseDescription(input))
                .toBe(`#### test file name\n  test data`)
        })

        test('it should return the input parsed and joined by new lines', () => {
            const input = [
                { filename: 'test one', data: 'test data one' },
                { filename: 'test two', data: 'test data two' },
                { filename: 'test three', data: 'test data three' }
            ]

            expect(parseDescription(input))
                .toBe(
                    '#### test one\n  test data one\n' +
                    '#### test two\n  test data two\n' +
                    '#### test three\n  test data three'
                )
        })
    })

    describe('parseIndex', () => {
        test('it should return the input data appending a newline', () => {
            const input = [
                { filename: 'test' }
            ]

            expect(parseIndex(input))
                .toBe('[test](#test)\n')
        })

        test('it should return the input data joined by newline characters', () => {
            const input = [
                { filename: 'test' },
                { filename: 'another test' },
                { filename: 'yet another test' }
            ]

            expect(parseIndex(input))
                .toBe(
                    '[test](#test)\n' +
                    '[another test](#another-test)\n' +
                    '[yet another test](#yet-another-test)\n'
                )
        })
   })

    describe('sanitizeIndexText', () => {
        test('it should slugify the filename and retrieve an anchor parsed in markdown', () => {
            expect(sanitizeIndexText({ filename: 'some test filename'}))
                .toBe('[some test filename](#some-test-filename)')
        })
    })

})
