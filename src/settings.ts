import * as core from '@actions/core'
import path from 'path'
import fs from 'fs'
import { DOMParser, XMLSerializer } from 'xmldom'
import format from 'xml-formatter'

export function getToolchainsTemplate(): Document {
	return getTemplate('../template', 'toolchains.xml')
}

export function getTemplate(filepath: string, filename: string): Document {
	const templatePath = path.join(__dirname, filepath, filename)
	const template = fs.readFileSync(templatePath).toString()
	return new DOMParser().parseFromString(template, 'text/xml')
}

export function formatSettings(templateXml: Node): string {
	const string = new XMLSerializer().serializeToString(templateXml)

	// format xml to standard format
	return format(string, {
		indentation: '  ',
		collapseContent: true,
		lineSeparator: '\n',
	})
}

export function update(templateXml: Document): void {
	updateToolchains(templateXml)
}

interface ToolchainsInput {
	type?: string
	jdkVersion?: string | number
	jdkHome?: string
	provides?: Record<string, unknown>
	configuration?: Record<string, unknown>
}

function updateToolchains(templateXml: Document) {
	const input = core.getInput('toolchains')
	if (!input) {
		return
	}

	const toolchainsXml = templateXml.getElementsByTagName('toolchains')[0]

	const parsedInput: ToolchainsInput[] = JSON.parse(input)
	parsedInput.forEach((toolchain) => {
		const xml = templateXml.createElement('toolchain')

		const type = templateXml.createElement('type')
		type.textContent = toolchain.type || 'jdk'
		xml.appendChild(type)

		const provides = templateXml.createElement('provides')
		if (toolchain.jdkVersion) {
			const version = templateXml.createElement('version')
			version.textContent = String(toolchain.jdkVersion)
			provides.appendChild(version)
		}
		if (toolchain.provides) {
			for (const e of Object.entries(toolchain.provides)) {
				const el = templateXml.createElement(e[0])
				el.textContent = String(e[1])
				provides.appendChild(el)
			}
		}
		xml.appendChild(provides)

		const configuration = templateXml.createElement('configuration')
		if (toolchain.jdkHome) {
			const jdkHome = templateXml.createElement('jdkHome')
			jdkHome.textContent = toolchain.jdkHome
			configuration.appendChild(jdkHome)
		}
		if (toolchain.configuration) {
			for (const e of Object.entries(toolchain.configuration)) {
				const el = templateXml.createElement(e[0])
				el.textContent = String(e[1])
				configuration.appendChild(el)
			}
		}
		xml.appendChild(configuration)
		toolchainsXml.appendChild(xml)
	})
}
