# Dev Stack Setup

Notes on setting up the dev stack for Windows 11.

0. Uninstall any existing NodeJS -- use "Add or Remove Programs" on Windows

1. Install nvm for windows
    https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
    Download and run `nvm-setup.exe`
    Quit and restart VSCode to update paths for terminal window.

    `nvm install latest`
    `nvm use latest`

2. Install Parcel and React
    `npm i -S parcel`
    `npm i react react-dom`

    Add to `.gitignore`:
        `.parcel-cache/`

    Add to `.package.json`
    ```
    "source": "src/index.html",
    "scripts": {
        "start": "parcel",
        "build": "parcel build"
    },
    ```
    NOTE: We need to specify a public url of `.`
    so to allow for relative referencing of routes.
    See https://stackoverflow.com/questions/70259224/deploying-react-app-with-parcel-build-on-github-pages

3. Install Libraries
    `npm i -S immer`
    `npm i -S use-immer`

4. Create basic structure
    Add `src/` folder
    Add `src/index.html` file

5. Start the dev server
    `npm start`


6. Set up github pages
    `npm i -S gh-pages`

    Make repo public if it isn't already -- needs to be public for gh-pages to work.

    Add to `.package.json`
    ```
    ...
    "scripts": {
        ...
        "predeploy" : "parcel build --public-url .",
        "deploy" : "gh-pages -d dist",
    },
    ```

    NOTE: with GitHub Desktop you might need to set the "Repository -> Repository Settings -> Git config" to "Use a lcoal Git config" with "bscs-dev-team" as the user.


    
# Troubleshooting


#### `fatal: a branch named 'gh-pages' already exists`
Message dispalyed during `npm run deploy`.
Remove the `node_modules/.cache/gh-pages` folder.


#### `remote: Permission to git denied to...`
On Windows, issue might be git credentials maanger.
1. Hit "Windows" key
2. Start "Credentials Manager"
3. Search for `github` entries.
4. Remove old entries.
