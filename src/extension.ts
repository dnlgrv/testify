// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';

type Terminal = 'integrated' | 'terminal' | 'iterm2';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let execute = vscode.commands.registerCommand("testify.execute", () => {
		vscode.window.showInputBox({
			placeHolder: "bundle exec rspec spec",
			prompt: "Command you would like to execute"
		}).then(cmd => {
			if (cmd) {
				let terminalTarget = vscode.workspace.getConfiguration("testify").get<Terminal>("terminalTarget") || "integrated";
				run(cmd, terminalTarget);
			}
		});
	});

	context.subscriptions.push(execute);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function run(cmd: string, target: Terminal) {
	switch (target) {
		case "integrated":
			runInIntegratedTerminal(cmd);
			break;
		case "iterm2":
			runInIterm2(cmd, "iTerm");
			break;
		case "terminal":
			runInTerminal(cmd, "Terminal");
			break;
	}
}

function runInIterm2(cmd: string, appName: string) {
	const escape = (s: string) => s.replace(/\'/g, "'\"'\"'");

	const externalCmd =
    `osascript ` +
    ` -e 'tell app "iTerm2"' ` +
    ` -e 'tell current session of current window to write text "${escape(cmd)}"' ` +
    ` -e 'end tell'`;

	exec(externalCmd);
}

function runInTerminal(cmd: string, appName: string) {
	const escape = (s: string) => s.replace(/\'/g, "'\"'\"'");

	const externalCmd =
    `osascript ` +
    ` -e 'tell app "Terminal"' ` +
    ` -e 'do script "${escape(cmd)}" in front window' ` +
    ` -e 'end tell'`;

	exec(externalCmd);
}

function runInIntegratedTerminal(cmd: string) {
	const existingTerminal = vscode.window.terminals[0];
	existingTerminal.sendText(cmd);
}
