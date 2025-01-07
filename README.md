# Prettier Java Plugin

A VSCode extension to format Java files with Prettier using prettier-plugin-java.

## Features

- Format Java files with no configuration necessary
- Specify a Prettier config file to use if desired

## Extension Settings

To set this formatter as the default formatter for Java files, add the following to your VSCode settings:

```json
"[java]": {
    "editor.defaultFormatter": "RudraPatel.prettier-plugin-java-vscode"
  }
```

This extension contributes the following settings:

- `prettier-plugin-java-vscode.enabled`: Enable/disable the plugin.
- `prettier-plugin-java-vscode.prettierConfigPath`: Provide a absolution path to your prettier configuration file.

## Release Notes

### 1.0.0

- Initial release
