const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMenuWindow() {
    const mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden-inset',
        title: 'Personal Planner',
        width: isDev ? 1200 : 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    mainWindow.maximize();
}

app.whenReady().then(() => {
    createMenuWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMenuWindow;
        }
    })
})

// If user isn't on Mac, the app quits
app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})