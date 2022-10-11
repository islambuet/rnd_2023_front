<template>
  <div v-if="taskData.permissions.action_0==1">

<!--    <div v-show="taskData.method=='list'">-->
<!--      <List/>-->
<!--    </div>-->
<!--    <div v-if="(taskData.permissions.action_1) &&(taskData.method=='add')">-->
<!--      <Add/>-->
<!--    </div>-->
<!--    <div v-if="(taskData.permissions.action_2) &&(taskData.method=='edit')">-->
<!--      <Add/>-->
<!--    </div>-->
    <!-- <Edit/> -->
    <!-- <Details/>         -->
  </div>
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import systemFunctions from "@/assets/systemFunctions";
  import toastFunctions from "@/assets/toastFunctions";
  import labels from '@/labels'
  import {reactive, watch} from 'vue'
  import {useRoute,useRouter} from 'vue-router';
  import axios from 'axios';

  const route =useRoute()
  const router =useRouter()

  let taskData=reactive({
    api_url:systemFunctions.getTaskBaseURL(import.meta.url),
    method:'list',

    permissions:{},
    itemDefault: {},
    item: {},           //single item
    items: {data:[]},   //from Laravel server with pagination and info
    itemsFiltered: [],    //for display
    columns:{all:{},hidden:[],sort:{key:'',dir:''}},
    pagination: {current_page: 1,per_page_options: [10,20,50,100,500,1000],per_page:100,show_all_items:true},
  })
  labels.add([{language:globalVariables.language,file:'tasks'+taskData.api_url+'/labels.js'}])

  const routing=async ()=>{

    await getItems(taskData.pagination);//Load at least once
    if(route.path==taskData.api_url)
    {
      //taskData.method='list';
    }
    else if(route.path==taskData.api_url+'/add')
    {
      // taskData.method='add';
      // addItem();
    }
    else if(route.path.indexOf(taskData.api_url+'/edit/')!=-1)
    {

      //taskData.method='edit';
      //editItem(route.params['item_id']);
      //addItem();
    }
  }
  watch(route, () => {
    routing();
  })
  const init=async ()=>{
    await axios.get(taskData.api_url+'/initialize').then((res)=>{
      if (res.data.error == "") {

      }
      else{
        toastFunctions.showResponseError(res.data)
      }
    });
  }
  if(!(globalVariables.user.id>0)){
    router.push("/login")
  }
  else{
    init();
  }
</script>
