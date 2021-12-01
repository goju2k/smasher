const {BrowserView, BrowserWindow} = require('electron')

class SmashWorker {

    constructor(scriptInfo, account){

        //시나리오 저장
        this.scriptInfo = scriptInfo

        //계정정보 저장
        this.account = account
        
        //윈도우 생성
        const width = 1800;
        const height = 900;
        this.win = new BrowserWindow({
            width: width, height: height,
            //minWidth: 360, minHeight: 286,
            title:"SMASHER WORKER",
            show: false,
            transparent:true,
            webPreferences: {
                partition: 'partition:'+new Date().getTime()
            }
        })

        //탭 띄우기
        // let xcnt = 10;
        // let ycnt = 10;

        // let viewWidth = (width / xcnt)
        // let viewHeight = (height / ycnt)
        // for (let i = 0; i < xcnt; i++){

        //     for (let k = 0; k < ycnt; k++) {

        //         let view = new BrowserView()
        //         this.win.addBrowserView(view)
        //         view.setBounds({ x: viewWidth*i, y: viewHeight*k, width: viewWidth, height: viewHeight })
        //         view.webContents.loadURL(this.scriptInfo.home)

        //     }
            
        // }

        this.wc = this.win.webContents;

        this.win.loadURL(this.scriptInfo.home)

        //window show
        this.win.once('ready-to-show', () => {
            this.win.show()
        })

        //page load 이벤트
        this.wc.on('did-finish-load', (e)=>{
            console.log('did-finish-load => ', e.sender.getURL())

            if (this.prcsInit === false) {
                //this.init()
                this.prcsInit = true;
            }
            
            if(this.reserveNext !== undefined){
                const nextIdx = this.reserveNext + 1;
                this.reserveNext = undefined
                this.playMain(nextIdx);
            }
        })

        //시나리오 play 변수
        this.prcsInit = false;
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
    
        console.log('scriptInfo playing at index:' + idx, this.currItem.code)
        
        const id = this.account.id
        const pass = this.account.pass
        const size = this.account.size
    
        const result = await this.wc.executeJavaScript(
            this.currItem.code.indexOf('${') >= 0 ? eval(this.currItem.code) : this.currItem.code
        )
    
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
