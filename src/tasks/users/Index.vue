<template>
  <div v-if="taskData.permissions.action_0==1">
    <div v-show="taskData.method=='list'">
      <List/>
    </div>
    <div v-if="(taskData.permissions.action_1) &&(taskData.method=='add')">
      <Add/>
    </div>
    <div v-if="(taskData.permissions.action_2) &&(taskData.method=='edit')">
      <Edit/>
    </div>
    <!-- <Details/>         -->
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

  import List from './List.vue'
  import Add from './Add.vue'
  import Edit from './Edit.vue'

  globalVariables.loadListData=true;
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
    pagination: {current_page: 1,per_page_options: [1,2,10,20,50,100,500,1000],per_page:1,show_all_items:true},
    users_groups:[],
    users_types:[],
  })
  labels.add([{language:globalVariables.language,file:'tasks'+taskData.api_url+'/labels.js'}])

  const routing=async ()=>{
    await getItems(taskData.pagination);//Load at least once
    if(route.path==taskData.api_url){
      taskData.method='list';
    }
    else if(route.path==taskData.api_url+'/add'){
      if(!(taskData.permissions.action_1)){
        //toastFunctions.showAccessDenyMessage();
        await router.push(taskData.api_url)
      }
      else{
        taskData.method='add';
      }
    }
    else if(route.path.indexOf(taskData.api_url+'/edit/')!=-1)
    {
      if(!(taskData.permissions.action_2)){
        await router.push(taskData.api_url)
      }
      else{
        taskData.method='edit';
      }
    }
  }
  watch(route, () => {
    routing();
  })
  // const setItemDefaults=()=>{
  //   let itemDefault={}
  //   let key='id';
  //   itemDefault[key] = {
  //     name: key,
  //     label: labels.get('label_'+key),
  //     type:'hidden',
  //     default:0,
  //     mandatory:true
  //   };
  //   key='username';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'text',
  //     default:'sha',
  //     mandatory:true
  //   };
  //   key='username_more';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'text',
  //     more_values:[],
  //     default:'',
  //     mandatory:true
  //   };
  //   key='email_more';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'text',
  //     more_values:[],
  //     default:'',
  //     mandatory:true
  //   };
  //   key='password';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'password',
  //     default:'',
  //     mandatory:true
  //   };
  //   key='password_more';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'password',
  //     more_values:[],
  //     default:'',
  //     mandatory:true
  //   };
  //   key='textarea';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'textarea',
  //     default:'asdf',
  //     mandatory:true
  //   };
  //   key='textarea_more';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'textarea',
  //     more_values:[],
  //     default:'asdasdasdas',
  //     mandatory:true
  //   };
  //   key='dropdown';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'dropdown',
  //     default:'',
  //     options:[{label:"Super Admin",value:1},{label:"Admin",value:2},{label:"Registered",value:3}],
  //     mandatory:true
  //   };
  //   key='dropdown_more';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'dropdown',
  //     more_values:[2,3,1],
  //     options:[{label:"Super Admin",value:1},{label:"Admin",value:2},{label:"Registered",value:3}],
  //     default:'1',
  //     mandatory:true
  //   };
  //   key='profile';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'file',
  //     default:'',
  //     mandatory:true
  //   };
  //   key='profile_more';
  //   itemDefault[key] = {
  //     name: 'item[' +key +']',
  //     label: labels.get('label_'+key),
  //     type:'image',
  //     more_values:['files/profile-pictures/1/1.PNG','y'],
  //     default:'',
  //     mandatory:true
  //   };
  //   taskData.itemDefault=itemDefault;
  //   //   name: key,
  //   //   // 'label' => __('label.' . $key),
  //   //   // 'type' => 'hidden',
  //   //   // 'default' => 0,
  //   //   // 'mandatory' => 'Yes',
  //   // }
  //   // columns.all[key]={
  //   //   label: labels.get('label_'+key),
  //   //   hideable:false,
  //   //   filterable:true,
  //   //   sortable:true,
  //   //   type:'number',
  //   //   filter:{from:'',to:''}
  //   // };
  // }
  //

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
  taskData.setFilteredItems=()=>{
    taskData.itemsFiltered=systemFunctions.getFilteredItems(taskData.items.data,taskData.columns);
  }
  taskData.reloadItems=(pagination)=>{
    globalVariables.loadListData=true;
    getItems(pagination);
  }
  const init=async ()=>{
    await axios.get(taskData.api_url+'/initialize').then((res)=>{
      if (res.data.error == "") {
        taskData.permissions=res.data.permissions;
        if(res.data.hidden_columns){
          taskData.columns.hidden=res.data.hidden_columns;
        }
        routing();
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
    init();
  }
</script>
