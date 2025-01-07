import { window } from "vscode";

// Create the output channel once at the module level
export const outputChannel = window.createOutputChannel("Prettier Java Plugin");

function getFormattedTime(): string {
  return new Date().toLocaleTimeString("en-US");
}

export function log(message: string | null): void {
  const time = getFormattedTime();

  outputChannel.appendLine(`[${time}] ${message}`);
}
