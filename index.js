//this is our electron app
const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

//represents underlying process electron uses to run the electron app
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
//app = thing we're listening to,
//'ready' = EVENT we're listening for
//() => { function to run when EVENT occurs }
//this is event base programming, this is an event handler
app.on('ready', () => {
    //makes a new Main app window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    //says look at current directory and load index.html file
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

//receives message from  main window(aka index.html)
//takes path of event and runs ffmpeg.ffprobe to get duration
ipcMain.on('video: submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        mainWindow.webContents.send(
            'video:metadata',
            metadata.format.duration
        );
    });
});

