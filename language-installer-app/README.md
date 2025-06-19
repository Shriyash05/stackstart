# Language Installer App

A simple Electron desktop app to install Python, C, and C++ on Windows, macOS, and Linux.

## Features
- Installs the latest version of Python, C, or C++ for your OS
- Sets up environment variables
- Tests the installation
- Simple UI

## How to Use

### 1. Install Dependencies
```
npm install
```

### 2. Run the App (Development)
```
npm start
```

### 3. Package the App (for Distribution)
```
npm run package
```
This will create executables for Windows, macOS, and Linux in the output directory.

## Notes
- You may need to run the app as administrator/root for installations to succeed.
- The app uses PowerShell scripts on Windows and bash scripts on macOS/Linux.
- Scripts are located in the `scripts/` directory.

## Security
- The app only runs local scripts and does not download code from the internet.
- Review scripts before running if you wish. 