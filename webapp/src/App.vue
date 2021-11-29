<template>
  <div id="app" style="position:relative;width:100vw;height:100vh">
    <div style="display:flex;height:30px;justify-content:flex-end;align-items:center;">
      <button @click="invokeWork" style="margin-right:5px;">생성</button>
      <button @click="playWork" style="margin-right:5px;">플레이</button>
    </div>
    <div style="height:calc(100% - 30px);background:lightgreen;">
      몸통부분 
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
      
    }
  },
  methods:{
    invokeWork(){
      this.$sendToApp('start', {cnt:2, scriptName:'nike.com'})
    },
    playWork(){
      this.$sendToApp('play')
    }
  }
}
</script>

<style>
*{
  padding:0px;
  margin:0px;
  box-sizing: border-box;
  font-size:12px;
}
</style>
