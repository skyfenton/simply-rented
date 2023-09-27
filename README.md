# Simply Rented
Web app for renting items you don't use every day. Allows renters to search for their desired item of choice, view a brief description of the item, and then decide if they want to rent. Items can be edited by the owners of the rental as well marked as returned straight from the app! Created by Herculease.

![image](https://github.com/herculease/simply-rented/assets/77299688/5ee73328-7517-4cd3-a636-945fdcd85440)
![image](https://github.com/herculease/simply-rented/assets/77299688/03de036a-216a-4272-badf-39f7d8f23598)

Instructions to run on local machine:

* Open files, run "npm i" in both react-frontend and expressjs-backend subdirectories via terminal
* "node backend.js" command in backend directory to start up backend
* "npm start" command in frontend directory to start up frontend/website

## Diagrams

https://github.com/herculease/simply-rented/wiki/Herculease-Diagrams

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
