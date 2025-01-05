import { format } from "prettier";
import javaPrettierPlugin from "prettier-plugin-java";
import {
  CancellationToken,
  ExtensionContext,
  FormattingOptions,
  languages,
  Range,
  TextDocument,
  TextEdit,
} from "vscode";

import { log } from "./logger";
import { checkIfEnabled, getPrettierOptions } from "./utils";

async function formatJavaDocument(
  document: TextDocument,
  _options: FormattingOptions,
  _token: CancellationToken,
): Promise<TextEdit[] | null> {
  const isEnabled = checkIfEnabled();

  if (!isEnabled) {
    log("Prettier Plugin Java VSCode is disabled");
    return null;
  }

  const start = Date.now();

  const documentText = document.getText();

  const prettierOptions = await getPrettierOptions(document);

  if (prettierOptions) {
    log(`Using Prettier options: ${JSON.stringify(prettierOptions)}`);
  } else {
    log("Using default Prettier options");
  }

  const formattedText = await format(documentText, {
    ...prettierOptions,
    parser: "java",
    plugins: [javaPrettierPlugin],
  });

  const documentStartRange = document.lineAt(0).range.start;
  const documentEndRange = document.lineAt(document.lineCount - 1).range.end;

  const entireDocumentRange = new Range(documentStartRange, documentEndRange);

  const elapsedTime = Date.now() - start;

  log(`Formatted ${document.fileName} in ${elapsedTime}ms.`);

  return [TextEdit.replace(entireDocumentRange, formattedText)];
}

export function activate(context: ExtensionContext) {
  log("Prettier Plugin Java VSCode activated.");

  const disposable = languages.registerDocumentFormattingEditProvider("java", {
    provideDocumentFormattingEdits: formatJavaDocument,
  });

  context.subscriptions.push(disposable);
}
