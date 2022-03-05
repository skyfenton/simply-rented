# simply-rented

Web app for renting items you don't use every day. Created by Herculease.

## Code Linter/Style Checker

Using to ESLint and Prettier to format to Airbnb javascript standards.

For local installs (if .eslintrc.json already exists!):
Install eslint and prettier extensions in VS Code
Then, run npm install in the root to install all dependencies
Finally, change any VSCode specific settings (recommended to change defaultFormatter to vscode-prettier)

For a new project (from https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a):
In the project folder, run 'npm install -D eslint prettier' in the terminal
Install the Airbnb eslint config with 'npx install-peerdeps --dev eslint-config-airbnb'
Install the Airbnb prettier config with 'npm install -D eslint-config-prettier eslint-plugin-prettier'
Add the following to a new .eslintrc.json config file:
{
"extends": ["airbnb", "prettier"],
"plugins": ["prettier"],
"rules": {
"prettier/prettier": ["error"]
},
}
Create a new .prettierrc file (with whatever prettier config settings you want)
