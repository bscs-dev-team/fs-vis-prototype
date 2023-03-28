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

3. Install Libraries
    `npm i -S immer`
    `npm i -S use-immer`

4. Create basic structure
    Add `src/` folder
    Add `src/index.html` file

5. Start the dev server
    `npm start`


