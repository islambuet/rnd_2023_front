<template>
  <div v-if="taskData.permissions.action_0==1">
  </div>
</template>
<script setup>
import globalVariables from "@/assets/globalVariables";
import systemFunctions from "@/assets/systemFunctions";
import toastFunctions from "@/assets/toastFunctions";
import labels from '@/labels'
import {provide, reactive, watch} from 'vue'
import {useRoute,useRouter} from 'vue-router';
import axios from 'axios';


globalVariables.loadListData=true;
const route =useRoute()
const router =useRouter()

let taskData=reactive({
  api_url:systemFunctions.getTaskBaseURL(import.meta.url),
  method:'list',
  permissions:{},
  crop_id:0,
  form_id:0,
  cropInfo:{},
  formInfo:{},
  itemsInput:[],
  seasons:[],
})
labels.add([{language:globalVariables.language,file:'tasks'+taskData.api_url+'/labels.js'}])

const routing=async ()=>{
  let crop_id=route.params['crop_id']?route.params['crop_id']:0;
  let form_id=route.params['form_id']?route.params['form_id']:0;
  if(taskData.crop_id!=crop_id){
    taskData.crop_id=crop_id;
    taskData.form_id=form_id;
    await init();
    // taskData.loadListDataForm=true;
    // taskData.renderedForm=false;
    // await init();
    // taskData.renderedForm=true;
  }

  console.log(crop_id+' '+form_id)
}
watch(route, () => {
  routing();
})


const getItems=async(pagination)=>{
  if(globalVariables.loadListData)
  {
    await axios.get(taskData.api_url+'/get-items?page='+ pagination.current_page+'&perPage='+ pagination.per_page)
        .then(res => {
          if(res.data.error==''){
            taskData.items= res.data.items;
            taskData.setFilteredItems();
          }
          else{
            toastFunctions.showResponseError(res.data)
          }
          globalVariables.loadListData=false;
        })
  }
}
const init=async ()=>{
  await axios.get(taskData.api_url+'/'+taskData.crop_id+'/'+taskData.form_id+'/initialize').then((res)=>{
    if (res.data.error == "") {
      taskData.permissions=res.data.permissions;
      taskData.cropInfo=res.data.cropInfo;
      taskData.formInfo=res.data.formInfo;
      taskData.itemsInput=res.data.itemsInput;
      taskData.seasons=res.data.seasons;
    }
    else{
      toastFunctions.showResponseError(res.data)
    }
  });
}
provide('taskData',taskData)
if(!(globalVariables.user.id>0)){
  router.push("/login")
}
else{
  routing();
}
</script>
