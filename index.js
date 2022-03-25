#! /usr/bin/env node
import fs from 'fs-extra';
import { exec } from 'child_process';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';
import chalk from 'chalk';
import gradient from 'gradient-string';

let projectName = '';
let folderName = '';

async function main() {
	await welcome();
}

async function welcome() {
	console.clear();
	figlet(`Welcome to ${'\n'} Create Electron CLI`, async (err, data) => {
		console.log(gradient.pastel(data));
		console.log(chalk.bold(gradient.pastel(`Create Electron CLI creates Electron React Boilerplate uses Electron, React, React Router, Webpack and React Fast Refresh.${'\n'}`)));
		await askProjectName();
	});
}

async function askProjectName() {
	const answer = await inquirer.prompt({
		name: 'project_name',
		type: 'input',
		message: chalk.green('What is your Project Name?'),
		default() {
			return 'ReactElectronProj';
		},
	});
	projectName = await answer.project_name;
	folderName = projectName.replace(/\s+/g, '');
	await createProject();
}

async function createProject() {
	const spinner = createSpinner(chalk.green('Start creating React Electron Project....')).start();
	exec(`git clone --depth 1 --branch main https://github.com/electron-react-boilerplate/electron-react-boilerplate.git ${folderName}`, (err, stdout, stderr) => {
		fs.mkdirSync(`${folderName}/src/renderer/src`);
		fs.mkdirSync(`${folderName}/src/renderer/src/components`);
		fs.mkdirSync(`${folderName}/src/renderer/src/services`);
		fs.mkdirSync(`${folderName}/src/renderer/src/stores`);
		fs.mkdirSync(`${folderName}/src/renderer/src/utils`);
		fs.mkdirSync(`${folderName}/src/renderer/src/views`);
		fs.mkdirSync(`${folderName}/src/renderer/src/routes`);
		exec(`cd ${folderName} && npm i`, () => {
			spinner.success({ text: `${projectName} has been created successfully` });
		});
	});
}

await main();
