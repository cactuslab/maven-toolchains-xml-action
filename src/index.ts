import * as core from '@actions/core'
import * as settings from './settings'
import os from 'os'
import path from 'path'
import fs from 'fs'

function run() {
	try {
		// open default template
		const templateXml = settings.getToolchainsTemplate()

		// update from action input
		settings.update(templateXml)

		// format to xml
		const formattedXml = settings.formatSettings(templateXml)

		// get custom output path
		const settingsPath = getToolchainsPath()
 
		// write template to filepath
		writeSettings(settingsPath, formattedXml)

	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message)
		} else {
			core.setFailed('An unknown error occurred')
		}
	}
}

function getToolchainsPath() {
	const outputFileInput = core.getInput('outputFile')

	if (!outputFileInput) {
		return getDefaultSettingsPath()
	}

	// resolve env variables in path
	if (outputFileInput.trim() != '') {
		return outputFileInput.trim().replace(/\$([A-Z_]+[A-Z0-9_]*)|\${([A-Z0-9_]*)}/ig, (_, a, b) => process.env[a || b] || '')
	}

	return getDefaultSettingsPath()
}

function getDefaultSettingsPath() { 
	return path.join(os.homedir(), '.m2', 'toolchains.xml')
}

function writeSettings(settingsPath: string, formattedXml: string) {
	if (!fs.existsSync(path.dirname(settingsPath))) {
		core.info('Creating directory for toolchains.xml: ' + settingsPath)
		fs.mkdirSync(path.dirname(settingsPath))
	}

	core.info('Writing toolchains.xml to path: ' + path.resolve(settingsPath))
	core.info(formattedXml)
	fs.writeFileSync(settingsPath, formattedXml)
}

run()
