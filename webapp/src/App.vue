<template>

  <!-- app -->
  <div id="app" class="app">

    <!-- 컨트롤 버튼 영역 -->
    <div class="section-btn">

      <button @click="invokeWork" class="btn">준비</button>
      <button @click="playWork" class="btn">구매시작!!</button>

    </div>

    <!-- 데이터셋팅 부분 -->
    <div class="section-data">

      <div class="t-title">계정 셋업</div>

      <div :key="i" class="t-row">
          
        <div class="t-col"></div>
        <div class="t-col">ID</div>
        <div class="t-col">PASSWORD</div>
        <div class="t-col">SIZE</div>
        <div class="t-col">추가</div>
        <div class="t-col">삭제</div>
        
      </div>

      <div class="t-hline"></div>

      <template v-for="(account, i) in accountList">
        
        <div v-if="i != 0" :key="'hline-'+i" class="t-hline"></div>
        <div :key="i" class="t-row" :style="isComplete(account)?'background:lightgreen;':''">
          
          <div class="t-col">{{'계정 '+(i +1 )}}</div>
          <div class="t-col"><input v-model="account.id"></div>
          <div class="t-col"><input v-model="account.pass" type="password"></div>
          <div class="t-col">
            <select v-model="account.size">
              <template v-for="multiple in sizeCnt"><option :key="multiple" :value="sizeFrom + (sizeUnit * multiple)">{{sizeFrom + (sizeUnit * multiple)}}</option></template>
            </select>
          </div>
          <div class="t-col"><button @click="copyAccount(account)">추가</button></div>
          <div class="t-col"><button @click="accountList.length > 1?accountList.splice(accountList.indexOf(account), 1):null">삭제</button></div>

        </div>
      </template>

    </div>

  </div>

</template>

<script>

export default {
  name: 'App',
  created(){
  },
  data(){
    return {
      sizeFrom:215,
      sizeUnit:5,
      sizeCnt:17,
      accountList:[{
          id:'', pass:'', size:''
      }],
    }
  },
  methods:{
    invokeWork(){
      this.$sendToApp('start', {cnt:this.accountList.length, accountList:this.accountList, scriptName:'nike.com'})
    },
    playWork(){
      this.$sendToApp('play')
    },
    copyAccount(account){
      this.accountList.push(JSON.parse(JSON.stringify(account)))
    },
    isComplete(account){
      return account.id != '' && account.pass != '' && account.size != ''
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body{
    margin:0px;
    font-size:12px;
    font-family: 나눔 고딕;
    overflow:hidden;
}

input{
    width:100%;
}

.app{
    position:relative;width:100vw;height:100vh;padding:20px;
}

.section-btn{
    display:flex;
    width:100%;
    height:30px;
    padding:6px;
    justify-content:flex-end;align-items:center;
}
.section-data{
    width:100%;
    height:calc(100% - 30px);
}

.btn{
    margin:0px 3px;
}

.t-title{
    font-size:13px;
    margin:10px;
    font-weight:600;
}

.t-row{
    display:flex;
    width:100%;
    height:30px;
    justify-content:flex-start;align-items:center;
    transition:background 1s;
}

.t-col{
    height:100%;
    width:20%;
    padding:3px 6px;
    display:flex;justify-content:center;align-items:center;
}

.t-col-left{
    justify-content:flex-start;
}

.t-col-right{
    justify-content:flex-end;
}

.t-hline{
    width:100%;
    height:1px;
    background:lightgray;
    margin:6px 0px;
}

</style>