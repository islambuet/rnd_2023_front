<template>
  <div class="card d-print-none mb-2">
    <div class="card-body">
      <router-link :to="taskData.api_url" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" ><i class="feather icon-corner-up-left"></i> {{labels.get('label_back')}}</router-link>
      <template v-if="item.exists">
        <button  type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(false)"><i class="feather icon-save"></i> {{labels.get('label_save')}}</button>
        <button  type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(true)"><i class="feather icon-plus-square"></i> {{labels.get('label_save_new')}}</button>
      </template>
    </div>
  </div>
  <div class="card d-print-none mb-2" v-if="item.exists">
    <div class="card-header">
      <div>{{labels.get('label_new_task')}}</div>
    </div>
    <div class="card-body">
      <form id="formSaveItem">
        <InputTemplate :inputItems="item.inputFields" />
      </form>
    </div>
  </div>
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import systemFunctions from "@/assets/systemFunctions";
  import toastFunctions from "@/assets/toastFunctions";
  import labels from '@/labels'
  
  import {useRoute,useRouter} from "vue-router";
  import {inject, reactive} from "vue";
  import axios from "axios";
  import InputTemplate from '@/components/InputTemplate.vue';
  
  
  const route =useRoute()
  const router =useRouter()
  let taskData = inject('taskData')
  let item=reactive({
    id:0,
    exists:false,
    inputFields:{},
    data:{
      id:0,
      username:'',
      password:'',
      email:'',
      name:'',
      mobile_no:'',

    }
  })
  const setInputFields=()=>{
    let inputFields={}
    let key='id';
    inputFields[key] = {
      name: key,
      label: labels.get('label_'+key),
      type:'hidden',
      default:item.data[key],
      mandatory:true
    };
    key='username';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'text',
      default:item.data[key],
      mandatory:true
    };
    key='password';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'password',
      default:item.data[key],
      mandatory:true
    };
    key='email';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'email',
      default:item.data[key],
      mandatory:true
    };
    key='name';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'text',
      default:item.data[key],
      mandatory:true
    };
    key='mobile_no';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'text',
      default:item.data[key],
      mandatory:true
    };
    key='dropdown';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'dropdown',
      default:'',
      options:[{label:"Super Admin",value:1},{label:"Admin",value:2},{label:"Registered",value:3}],
      mandatory:true
    };
    key='dropdown_more';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'dropdown',
      more_values:[2,3,1],
      options:[{label:"Super Admin",value:1},{label:"Admin",value:2},{label:"Registered",value:3}],
      default:'1',
      mandatory:true
    };
    item.inputFields=inputFields;
  }
  if(!(taskData.permissions.action_1)){
    toastFunctions.showAccessDenyMessage();
  }
  else{
    setInputFields();
    item.exists=true;
  }

</script>