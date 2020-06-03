const electron = require('electron');

//represents underlying process electron uses to run the electron app
const { app, BrowserWindow } = electron;

let mainWindow;
//app = thing we're listening to,
//'ready' = EVENT we're listening for
//() => { function to run when EVENT occurs }
//this is event base programming
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

