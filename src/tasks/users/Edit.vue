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
      <div>{{labels.get('label_edit_task')}}({{item.id}})</div>
    </div>
    <div class="card-body">
      <form id="formSaveItem">
        {{item}}
<!--        <InputTemplate :inputItems="taskData.item" />-->
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


  const route =useRoute()
  const router =useRouter()
  let taskData = inject('taskData')
  let item=reactive({
    id:0,
    exists:false,
    form:{},
    data:{}
  })
  const getItem=async ()=>{
    await axios.get(taskData.api_url+'/get-item/'+ item.id).then((res)=>{
      if (res.data.error == "") {
        item.data=res.data.item;
        setItemForm();
        item.exists=true;
      }
      else{
        toastFunctions.showResponseError(res.data)
      }
    });
  }
  const setItemForm=()=>{
    let itemForm={}
    let key='id';
    itemForm[key] = {
      name: key,
      label: labels.get('label_'+key),
      type:'hidden',
      default:item.id,
      mandatory:true
    };
    key='username';
    itemForm[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'text',
      default:item.data[key],
      mandatory:true
    };
    item.form=itemForm;
  }
  if(!(taskData.permissions.action_2)){
    toastFunctions.showAccessDenyMessage();
  }
  else{
    item.id=route.params['item_id'];
    getItem();
  }
</script>