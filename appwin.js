const {
  app,
  BrowserWindow,
  Menu
} = require('electron');

var io = require('socket.io');

let WindowApp;


const menu = Menu;

const MenuApp = [{label: "Reload", click:()=>{io.emit('Reload')}}]

app.on('ready',()=>{
  WindowApp = new BrowserWindow({
    resizable:false,
    width:500,
    height:500
  });

  WindowApp.loadURL('file://' + __dirname + '/public/index.html');
  menu.setApplicationMenu(menu.buildFromTemplate(MenuApp));
});
