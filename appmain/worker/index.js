const {BrowserWindow} = require('electron')

class SmashWorker {

    constructor(scriptInfo){

        //시나리오 저장
        this.scriptInfo = scriptInfo
        
        //윈도우 생성
        this.win = new BrowserWindow({
            width: 1280, height: 960,
            //minWidth: 360, minHeight: 286,
            title:"SMASHER WORKER",
            show: false,
            transparent:true,
            webPreferences: {
                partition: 'partition:'+new Date().getTime()
            }
        })

        this.wc = this.win.webContents;

        this.win.loadURL(this.scriptInfo.home)

        //window show
        this.win.once('ready-to-show', () => {
            this.win.show()
            this.init()
        })

        //page load 이벤트
        this.wc.on('did-finish-load', (e)=>{
            console.log('did-finish-load => ', e.sender.getURL())
            if(this.reserveNext !== undefined){
                const nextIdx = this.reserveNext + 1;
                this.reserveNext = undefined
                this.playMain(nextIdx);
            }
        })

        //시나리오 play 변수
        this.currType;
        this.currItem;
        this.reserveNext;

    }

    async init(){
        this.currType = 'init'
        this.playMain(undefined)
    }

    async play(){
        this.currType = 'play'
        this.playMain(undefined)
    }

    async playMain(idx){

        if(idx === undefined) idx = 0
        this.currItem = this.scriptInfo[this.currType][idx]
    
        if(!this.currItem) {
            console.log('scriptInfo play end at index:'+idx)
            return
        }
    
        console.log('scriptInfo playing at index:'+idx, this.currItem.code)
    
        const result = await this.wc.executeJavaScript(this.currItem.code)
    
        console.log('result '+idx, result)
    
        if(this.currItem.timeAfter){
    
            setTimeout(()=>{
                this.playMain(idx + 1);
            }, this.currItem.timeAfter)
    
        }else if(this.currItem.eventAfter){
    
            this.reserveNext = idx;
    
        }else{
            this.playMain(idx + 1);
        }
    
    }

}

module.exports = SmashWorker
