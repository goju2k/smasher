const path = require('path')
const {BrowserWindow, ipcMain} = require('electron')
const Worker = require('../worker')

const workers = []
const functions = {
    'start':function(arg){

        console.log('work start arg => ', arg)

        workers.length = 0

        const cnt = arg.cnt
        const scriptName = arg.scriptName

        const scriptInfo = require('../../appscript/'+scriptName)

        for(let i = 0 ; i < cnt ; i++){
            workers.push(new Worker(scriptInfo))
        }

        console.log(cnt + ' workers created')

    },
    'play': function(){
        for(let worker of workers){
            worker.play()
        }
    }
}

//통신 모듈
ipcMain.on('sendApp', (e, arg) => {
    
    const item = JSON.parse(arg)
    console.log('sendApp start', item);

    const func = functions[item.command];
    if(func){
        console.log('sendApp func');
        const resdata = func(item.arg)
        console.log('resdata',resdata)
        e.reply('fromApp', JSON.stringify({id:item.id, data:resdata}))
        console.log('fromApp replied')
    }else{
        console.warn(item.command+' is not found in the apps')
    }

    console.log('sendApp end');
})

let win;
module.exports = function(){

    if(win) return

    win = new BrowserWindow({
        width: 400, height: 400,
        //minWidth: 360, minHeight: 286,
        title:"SMASHER",
        resizable:true,
        show: false,
        frame: true,
        transparent:true,
        fullscreenable:true,
        useContentSize:true,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.resolve(__dirname, "../../preload.js") // use a preload script
        }
    })

    win.loadURL('http://localhost:8080');
    //win.loadFile('./webapp/dist/index.html')
    win.once('ready-to-show', () => {

        win.show()

    })
    
}