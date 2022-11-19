<template>
  <div class="card d-print-none mb-2">
    <div class="card-body">
      <router-link :to="taskData.api_url+'/'+taskData.crop_id+'/'+taskData.year" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" ><i class="feather icon-corner-up-left"></i> {{labels.get('label_back')}}</router-link>
      <template v-if="item.exists">
        <button  type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(false)"><i class="feather icon-save"></i> {{labels.get('label_save')}}</button>
      </template>
    </div>
  </div>
  <div class="card d-print-none mb-2" v-if="item.exists">
    <div class="card-header">
      <div>{{labels.get('label_edit_task')}}</div>
    </div>
    <div class="card-body">
      {{item}}
      <DetailTemplate :detailFields="item.detailFields" />
<!--      <form id="formSaveItem">-->
<!--        <InputTemplate :inputItems="item.inputFields" />-->
<!--      </form>-->
    </div>
  </div>
</template>
<script setup>

import globalVariables from "@/assets/globalVariables";
import systemFunctions from "@/assets/systemFunctions";
import toastFunctions from "@/assets/toastFunctions";
import labels from '@/labels'

import {useRouter} from "vue-router";
import {inject, reactive} from "vue";
import axios from "axios";
import InputTemplate from '@/components/InputTemplate.vue';
import {useRoute} from "vue-router/dist/vue-router";
import DetailTemplate from '@/components/DetailTemplate.vue';


const route =useRoute()
const router =useRouter()
let taskData = inject('taskData')
let item=reactive({
  variety_id:0,
  exists:false,
  inputFields:{},
  detailFields:{},
  data:{

  }
})
const setDetailFields=async ()=> {
  item.detailFields = {};
  await systemFunctions.delay(1);
  let detailFields = {}
  let key = 'year';
  detailFields[key] = {
    label: labels.get('label_' + key),
    type: 'text',
    values: [taskData.year],
  };
  key = 'crop_name';
  detailFields[key] = {
    label: labels.get('label_' + key),
    type: 'text',
    values: [taskData.cropInfo.name],
  };
  key='crop_type_name';
  detailFields[key] = {
    label: labels.get('label_'+key),
    type:'text',
    values:[item.data[key]],
  };
  key='name';
  detailFields[key] = {
    label: labels.get('label_'+key),
    type:'text',
    values:[item.data[key]],
  };
  key='rnd_code';
  detailFields[key] = {
    label: labels.get('label_'+key),
    type:'text',
    values:[item.data[key]],
  };
  item.detailFields=detailFields;
};
const save=async (save_and_new)=>{
}
const getItem=async ()=>{
  item.variety_id=route.params['variety_id'];
  await axios.get(taskData.api_url+'/'+taskData.crop_id+'/'+taskData.year+'/get-item/'+ item.variety_id).then((res)=>{
    if (res.data.error == "") {
      item.data=res.data.item;
      setDetailFields();
      item.exists=true;
    }
    else{
      toastFunctions.showResponseError(res.data)
    }
  });
}
getItem();
</script>