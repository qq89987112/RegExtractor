<template>
  <div>
    <textarea v-model="dataSourceContent" class="datasource" cols="30" rows="10" placeholder="数据源"></textarea>
    <textarea v-model="regContent" class="reg-editor" cols="30" rows="10" placeholder="正则"></textarea>
    <div class="output">
      {{output || regExtract.getError() }}
    </div>
  </div>
</template>

<script>
import RegExtract from "../js/reg-extractor"
export default {
  name: 'HelloWorld',
  data () {
    this.regExtract = new RegExtract();
    return {
      regContent:'',
      dataSourceContent:''
    }
  },
  computed:{
    output(){
      let regExtract = this.regExtract;
      regExtract.setContent(this.dataSourceContent);
      return regExtract.extract(this.regContent);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    padding: 0;
    margin: 0;
    border:none;
    box-sizing: border-box;
  }
  .datasource{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    resize: none;
    border-right:1px solid #ddd;
  }
  .reg-editor{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 50%;
    width: 50%;
    resize: none;
  }
  .output{
    position: absolute;
    border-top:1px solid #ddd;
    right: 0;
    top: 50%;
    bottom: 0;
    width: 50%;
  }
</style>
