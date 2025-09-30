import { constants, promises } from "fs";
import path from "path";
import { Options, resolveConfig } from "prettier";
import { TextDocument, workspace } from "vscode";

import { log } from "./logger";

export function checkIfEnabled(): boolean {
  const isEnabled = workspace
    .getConfiguration("prettier-plugin-java-vscode")
    .get<boolean>("enabled");

  return isEnabled ?? true;
}

async function doesFileExist(filePath: string): Promise<boolean> {
  try {
    await promises.access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function transformUserProvidedConfigPath(configPath: string): string {
  /**
   * Prettier wants an absolute path to a config file
   * This function supports the following scenarios:
   * 1. The user wants to inject their workspace folder into the config path
   * 2. The user provides a relative path which will attempt to be coerced into an absolute path
   */
  const workspaceFolder = workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (workspaceFolder && configPath.includes("${workspaceFolder}")) {
    return configPath.replace("${workspaceFolder}", workspaceFolder);
  }

  if (workspaceFolder && !path.isAbsolute(configPath)) {
    return path.join(workspaceFolder, configPath);
  }

  return configPath;
}

async function getPrettierConfigPath(document: TextDocument): Promise<string> {
  const userProvidedConfigPath = workspace
    .getConfiguration("prettier-plugin-java-vscode")
    .get<string | null>("prettierConfigPath");

  if (!userProvidedConfigPath) {
    log(
      `No specified Prettier config file. Prettier will attempt to resolve the config file from the document file name (${document.fileName})`,
    );

    return document.fileName;
  }

  const transformedConfigPath = transformUserProvidedConfigPath(
    userProvidedConfigPath,
  );

  if (userProvidedConfigPath !== transformedConfigPath) {
    log(
      `Transformed provided config path '${userProvidedConfigPath}' into '${transformedConfigPath}'`,
    );
  }

  const fileExists = await doesFileExist(transformedConfigPath);

  if (!fileExists) {
    log(
      `Specified Prettier config file (${transformedConfigPath}) does not exist. Prettier will attempt to resolve the config file from the document file name (${document.fileName})`,
    );

    return document.fileName;
  }

  log(`Using prettier config path: ${transformedConfigPath}`);

  return transformedConfigPath;
}

export async function getPrettierOptions(
  document: TextDocument,
): Promise<Options | null> {
  const prettierConfigPath = await getPrettierConfigPath(document);

  try {
    return await resolveConfig(prettierConfigPath, { editorconfig: true });
  } catch (error) {
    log(`Error parsing Prettier config: ${error}`);
    return null;
  }
}
