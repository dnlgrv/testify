type LastCommand = string | null;
let lastCommand: LastCommand = null;

function forget() {
  lastCommand = null;
}

function recall(): LastCommand {
  return lastCommand;
}

function remember(cmd: string) {
  lastCommand = cmd;
}

export { forget, recall, remember };
