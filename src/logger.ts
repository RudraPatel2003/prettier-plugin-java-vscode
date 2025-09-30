import { window } from "vscode";

// Create the output channel once at the module level
export const outputChannel = window.createOutputChannel("Prettier Java Plugin");

function getFormattedTime(): string {
  return new Date().toLocaleTimeString("en-US");
}

const logs: string[] = [];

export function log(message: string | null): void {
  const time = getFormattedTime();

  logs.push(`[${time}] ${message}`);
}

export async function flushLogs(): Promise<void> {
  // asynchronously flush the logs to the output channel
  // This is asynchronous to not slow down the formatting process
  for (const log of logs) {
    outputChannel.appendLine(log);
  }

  logs.length = 0;

  return Promise.resolve();
}
