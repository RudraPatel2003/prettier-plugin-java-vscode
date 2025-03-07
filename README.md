<h1 align="center">
  <br />
  <img
    src="https://raw.githubusercontent.com/RudraPatel2003/prettier-plugin-java-vscode/refs/heads/main/icon.png"
    alt="Prettier Java Plugin Logo"
  />
  <br />
  Prettier Java Plugin
  <br />
</h1>

<h2 align="center">
  Format Java files with Prettier using prettier-plugin-java. No configuration
  necessary.
</h2>

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
- `prettier-plugin-java-vscode.prettierConfigPath`: Provide an absolution path to your prettier configuration file.

## Release Notes

### 1.0.2

- Update logo to follow VSCode guidelines

### 1.0.1

- Upgrade dependencies

### 1.0.0

- Initial release
