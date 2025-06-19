const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const os = require('os');

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    resizable: false,
    title: 'Language Installer',
  });
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: Run install script
ipcMain.handle('run-install-script', async (event, { language, os: osName }) => {
  const scriptName = `${language}-setup-${osName}${osName === 'windows' ? '.ps1' : '.sh'}`;
  const scriptSourcePath = path.join(__dirname, 'scripts', scriptName);

  // Extract to temp directory
  const tempDir = path.join(os.tmpdir(), 'stackstart-scripts');
  await fse.ensureDir(tempDir);
  const scriptDestPath = path.join(tempDir, scriptName);

  // Copy script out of asar if needed
  try {
    await fse.copy(scriptSourcePath, scriptDestPath);
  } catch (err) {
    return { success: false, output: `Installer script not found for ${language} on ${osName}.` };
  }

  let command;
  if (osName === 'windows') {
    command = `powershell -ExecutionPolicy Bypass -File "${scriptDestPath}"`;
  } else {
    command = `bash "${scriptDestPath}"`;
  }
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve({ success: false, output: stderr || error.message });
      } else {
        resolve({ success: true, output: stdout });
      }
    });
  });
}); 