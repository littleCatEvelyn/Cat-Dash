# COS 426 Final Project: Cat Dash

Cat dash is an endless runner game. Players use left and right arrow keys to control the cat avoid obstacles and collect flowers!

The flying speed and density of obstacles increase as the game goes on to make it more challenging and thrilling. 

[Online Demo](https://littlecatevelyn.github.io/Cat-Dash/)

## Installation
To build this project, you will need to use GitHub's NodeJS Package Manager (npm) to manage and install project dependencies. All npm settings, as well as your project dependencies and their versionings, are defined in the file `package.json`. We will unpack this file in the next section.

The NodeJS Package Manager, which is the world's largest software registry and supports over one million open source JavaScript packages and libraries, runs in a NodeJS runtime. The NodeJS runtime is essentially a port of Google Chrome's JavaScript V8 engine that will run directly in your terminal (instead of within a browser).

Before you begin, you will need to install [NodeJS and npm](https://www.npmjs.com/get-npm). Then, open a new terminal instance, set your working directory to the root of the project, and run `npm install`.

## Setting Up Your Project
Before you start your project, look inside `package.json`. Take a note of the following fields, and adjust them where appropriate:

* `name`: This is your project name as it would appear on the npm registry (if published). You should replace this with your own project name, but make sure to preserve the all lowercase and hyphenated format.

* `repository`: This holds the name of your repository for this project. It should match name of your GitHub repository as it appears in the URL. For instance, "https://github.com/ReillyBova/three-seed" would become "three-seed".

* `version`: This field is used to version your project. The standard format for these is "MAJOR.MINOR.PATCH". You can update this as needed (for instance, setting it to "1.0.0" when you are finished with the project), or you can choose to ignore it.

* `title`: This field contains the "pretty" name of your project. When you run your project in the browser, this title will be injected into the site's HTML header. Most browsers will use this to label the browser tab.

* `description`: A really quick description of your project.

* `keywords`: A list of keywords for you project. Feel free to modify as needed, note that the last keyword should **not** be followed by a comma, since `package.json` must adhere to JSON format.

* `scripts`: This field contains several npm scripts that you will find useful. The first three commands (`start`, `prebuild`, and `build`) are used to build the development webserver, as well as the production bundle, for your project. `format` is used to "prettify" your JavaScript into a standardized format, as specified in `.prettierrc`. Finally, `deploy` is used to publish your project to GitHub Pages as a live demo. You can run any of these commands from the command line using `npm run <script-name>`.

The dependencies below these fields tell npm what libraries (and more specifically, which versions of these libraries) to download when you run `npm install`. If there are further packages you would like to add to your project, you can install them by running `npm install <package-name>`.

## Launching a Local Webserver
Now that your development environment is ready to go, you can spin up a local development webserver using `npm start`. This command will bundle the project code and start a development server at [http://localhost:8080/](http://localhost:8080/). Visit this in your web browser; every time you make changes to the code, *the page will automatically refresh!* 

## License
[MIT](./LICENSE)
