// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import settings from "./settings";
import type { Terminal } from "./settings";
import { exec } from "child_process";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let testFile = vscode.commands.registerCommand("testify.testFile", () => {
    let fileName = vscode.window.activeTextEditor?.document.fileName;

    if (fileName) {
      let relativePath = vscode.workspace.asRelativePath(fileName);
      run(`bundle exec rspec ${relativePath}`);
    }
  });

  let testLine = vscode.commands.registerCommand("testify.testLine", () => {
    let editor = vscode.window.activeTextEditor;
    if (!editor) { return; };

    let fileName = editor.document.fileName;
    if (fileName) {
      let relativePath = vscode.workspace.asRelativePath(fileName);

      let line = editor.selection.active.line;
      editor.document.save();

      run(`bundle exec rspec ${relativePath}:${line}`);
    }
  });

  context.subscriptions.push(testFile);
  context.subscriptions.push(testLine);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function run(cmd: string) {
  switch (settings.terminalTarget()) {
    case "integrated":
      runInIntegratedTerminal(cmd);
      break;
    case "iterm":
      runInIterm(cmd);
      break;
    case "terminal":
      runInTerminal(cmd);
      break;
  }
}

function runInIterm(cmd: string) {
  const externalCmd =
    `osascript ` +
    ` -e 'tell app "iTerm2"' ` +
    ` -e 'tell current session of current window to write text "${escape(cmd)}"' ` +
    ` -e 'end tell'`;

  exec(externalCmd);
}

function runInTerminal(cmd: string) {
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

function escape(s: string): string {
  return s.replace(/\'/g, "'\"'\"'");
}
