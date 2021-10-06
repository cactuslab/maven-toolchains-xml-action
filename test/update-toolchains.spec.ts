import process from 'process'
import * as settings from '../src/settings'

describe('validate toolchains', function() {

	describe('when empty input', function() {
		it('<toolchains/> should be not be changed when input.toolchains is missing', function() {
			// given input
			process.env['INPUT_TOOLCHAINS'] = ''

			// when
			const actualXml = settings.getToolchainsTemplate()
			settings.update(actualXml)
			const actual = settings.formatSettings(actualXml)

			// then
			const expectedXml = settings.getTemplate('../test/resources/', 'when-toolchains-missing.xml')
			const expected = settings.formatSettings(expectedXml)
			expect(actual).toEqual(expected)

			// tear down
			process.env['INPUT_TOOLCHAINS'] = ''
		})
	})

	describe('when custom input', function() {
		it('<toolchains/> should be appended with <toolchain> when input.toolchains is present', function() {
			// given input
			process.env['INPUT_TOOLCHAINS'] = '[{"jdkVersion": "8", "jdkHome": "/java/8"}]'

			// when
			const actualXml = settings.getToolchainsTemplate()
			settings.update(actualXml)
			const actual = settings.formatSettings(actualXml)

			// then
			const expectedXml = settings.getTemplate('../test/resources/', 'when-toolchains-present.xml')
			const expected = settings.formatSettings(expectedXml)
			expect(actual).toEqual(expected)

			// tear down
			process.env['INPUT_TOOLCHAINS'] = ''
		})
	})

	describe('when extended configuration input', function() {
		it('<toolchains/> should be appended with <toolchain><configuration> when extended configuration is provided', function() {
			// given input
			process.env['INPUT_TOOLCHAINS'] = '[{"jdkVersion": "8", "provides": {"vendor": "temurin"}, "jdkHome": "/java/8", "configuration": {"extra": "read all about it"}}]'

			// when
			const actualXml = settings.getToolchainsTemplate()
			settings.update(actualXml)
			const actual = settings.formatSettings(actualXml)

			// then
			const expectedXml = settings.getTemplate('../test/resources/', 'when-toolchains-with-extended-configuration.xml')
			const expected = settings.formatSettings(expectedXml)
			expect(actual).toEqual(expected)

			// tear down
			process.env['INPUT_TOOLCHAINS'] = ''
		})
	})

})

