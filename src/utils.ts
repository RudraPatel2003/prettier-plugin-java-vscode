import { constants, promises } from "fs";
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

async function getPretterConfigPath(document: TextDocument): Promise<string> {
  const userProvidedConfigPath = workspace
    .getConfiguration("prettier-plugin-java-vscode")
    .get<string | null>("prettierConfigPath");

  if (userProvidedConfigPath) {
    const fileExists = await doesFileExist(userProvidedConfigPath);

    if (!fileExists) {
      log(
        `Specified Prettier config file (${userProvidedConfigPath}) does not exist`,
      );
      log(
        `Prettier will attempt to resolve the config file from the document file name (${document.fileName})`,
      );

      return document.fileName;
    }

    log(`Using prettier config path: ${userProvidedConfigPath}`);

    return userProvidedConfigPath;
  }

  log("No specified Prettier config file");
  log(
    `Prettier will attempt to resolve the config file from the document file name (${document.fileName})`,
  );

  return document.fileName;
}

export async function getPrettierOptions(
  document: TextDocument,
): Promise<Options | null> {
  const prettierConfigPath = await getPretterConfigPath(document);

  try {
    return resolveConfig(prettierConfigPath, { editorconfig: true });
  } catch (error) {
    log(`Error parsing Prettier config: ${error}`);
    return null;
  }
}
