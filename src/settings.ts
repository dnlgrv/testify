import * as vscode from "vscode";

export type Terminal = "integrated" | "terminal" | "iterm";

function terminalTarget(): Terminal {
  return vscode.workspace.getConfiguration("testify").get<Terminal>("terminalTarget") || "integrated";
}

export default {
  terminalTarget
};
