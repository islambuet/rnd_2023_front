<template>
  <div v-if="taskData.permissions.action_0==1">
    <Search/>
    <div class="row mb-2"  v-if="taskData.cropInfo.replica=='Yes'">
      <div class="col-4">
      </div>
      <div class="text-center btn btn-primary col-4">
        {{labels.get('Normal')}}
      </div>
      <div class="text-center btn btn-danger col-4">
        {{labels.get('Replica')}}
      </div>
    </div>

    <template  v-for="inputItem in taskData.itemsInput">
      <div class="row mb-2">
        <div class="col-4">
          <label class="font-weight-bold float-right">{{inputItem.name}}<span class="text-danger" v-if="inputItem.mandatory=='Yes'">*</span></label>
        </div>
        <div :class="taskData.cropInfo.replica=='Yes'?'col-4':'col-lg-4 col-8'">
          <textarea v-if="inputItem.type=='textarea'" :id="'item_'+inputItem.id" class="form-control" :name="'item[normal]['+inputItem.id+']'">{{inputItem.default}}</textarea>
          <div v-if="inputItem.type=='image'">
            <div class="row mb-2">
              <div class="col-12">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <label class="btn btn-sm bg-gradient-primary" style="cursor: pointer;">
                      <input :id="'item_'+inputItem.id" type="file" class="d-none" :data-preview-container="'#item_'+inputItem.id+'_preview_container'">
                      <i class="bi bi-upload"></i> {{labels.get('label_upload_file')}}
                    </label>
                  </div>
                  <label class="form-control custom-file-name"></label>
                  <div class="input-group-append clear_file" @click="resetFile('item_'+inputItem.id,inputItem.default)">
                    <label class="btn btn-sm bg-gradient-info" style="cursor: pointer;">{{labels.get('clear')}}</label>
                  </div>
                  <input :id="'#item_'+inputItem.id+'_file_input'" type="hidden" :name="'item[normal]['+inputItem.id+']'" :value="inputItem.default" />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12 system_preview_container" :id="'item_'+inputItem.id+'_preview_container'">
                <img style="max-width: 100%;max-height:200px" :src="systemFunctions.getImageUrl(inputItem.default)">
              </div>
            </div>
          </div>
          <div v-else-if="inputItem.type=='dropdown'" class="input-group" >
            <select :id="'item_'+inputItem.id" class="form-control" :name="'item[normal]['+inputItem.id+']'">
              <option value="">{{labels.get('label_select')}}</option>
              <option v-for="option in (inputItem.options?inputItem.options.split('\r\n'):[])" :value="option" :selected="inputItem.default==option">
                {{option}}
              </option>
            </select>
          </div>
          <div v-else-if="inputItem.type=='checkbox'" class="input-group" >
            <div class="form-check form-check-inline" v-for="(option,index) in (inputItem.options?inputItem.options.split('\r\n'):[])">
              <input class="form-check-input" type="checkbox" :id="'item_'+inputItem.id+'_'+index" :value="option" :name="'item[normal]['+inputItem.id+'][]'" :checked="true">
              <label class="form-check-label" :for="'item_'+inputItem.id+'_'+index">{{option}}</label>
            </div>
          </div>
          <div v-else class="input-group" >
            <input :id="'item_'+inputItem.id" :type="inputItem.type" class="form-control" :class="inputItem.class? inputItem.class:null" :name="'item[normal]['+inputItem.id+']'" :value="inputItem.default"/>
          </div>
        </div>
        <div class="col-4" v-if="taskData.cropInfo.replica=='Yes'">
          <textarea v-if="inputItem.type=='textarea'" :id="'item_'+inputItem.id" class="form-control" :name="'item[normal]['+inputItem.id+']'">{{inputItem.default}}</textarea>
          <div v-if="inputItem.type=='image'">
            <div class="row mb-2">
              <div class="col-12">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <label class="btn btn-sm bg-gradient-primary" style="cursor: pointer;">
                      <input :id="'item_'+inputItem.id" type="file" class="d-none" :data-preview-container="'#item_'+inputItem.id+'_preview_container'">
                      <i class="bi bi-upload"></i> {{labels.get('label_upload_file')}}
                    </label>
                  </div>
                  <label class="form-control custom-file-name"></label>
                  <div class="input-group-append clear_file" @click="resetFile('item_'+inputItem.id,inputItem.default)">
                    <label class="btn btn-sm bg-gradient-info" style="cursor: pointer;">{{labels.get('clear')}}</label>
                  </div>
                  <input :id="'#item_'+inputItem.id+'_file_input'" type="hidden" :name="'item[normal]['+inputItem.id+']'" :value="inputItem.default" />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12 system_preview_container" :id="'item_'+inputItem.id+'_preview_container'">
                <img style="max-width: 100%;max-height:200px" :src="systemFunctions.getImageUrl(inputItem.default)">
              </div>
            </div>
          </div>
          <div v-else-if="inputItem.type=='dropdown'" class="input-group" >
            <select :id="'item_'+inputItem.id" class="form-control" :name="'item[normal]['+inputItem.id+']'">
              <option value="">{{labels.get('label_select')}}</option>
              <option v-for="option in (inputItem.options?inputItem.options.split('\r\n'):[])" :value="option" :selected="inputItem.default==option">
                {{option}}
              </option>
            </select>
          </div>
          <div v-else-if="inputItem.type=='checkbox'" class="input-group" >
            <div class="form-check form-check-inline" v-for="(option,index) in (inputItem.options?inputItem.options.split('\r\n'):[])">
              <input class="form-check-input" type="checkbox" :id="'item_'+inputItem.id+'_'+index" :value="option" :name="'item[normal]['+inputItem.id+'][]'" :checked="true">
              <label class="form-check-label" :for="'item_'+inputItem.id+'_'+index">{{option}}</label>
            </div>
          </div>
          <div v-else class="input-group" >
            <input :id="'item_'+inputItem.id" :type="inputItem.type" class="form-control" :class="inputItem.class? inputItem.class:null" :name="'item[normal]['+inputItem.id+']'" :value="inputItem.default"/>
          </div>
        </div>
      </div>
    </template>
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
import Search from './Search.vue'

globalVariables.loadListData=true;
const route =useRoute()
const router =useRouter()

let taskData=reactive({
  api_url:systemFunctions.getTaskBaseURL(import.meta.url),
  current_year:new Date().getFullYear(),
  permissions:{},
  crop_id:0,
  form_id:0,
  trial_station_id:0,
  year:0,
  season_id:0,
  trial_stations:[],
  seasons:[],
  cropInfo:{},
  formInfo:{},
  inputFields:[],

})
labels.add([{language:globalVariables.language,file:'tasks'+taskData.api_url+'/labels.js'}])

const routing=async ()=>{
  let crop_id=route.params['crop_id']?route.params['crop_id']:0;
  let form_id=route.params['form_id']?route.params['form_id']:0;


  if((taskData.crop_id!=crop_id)||(taskData.form_id!=form_id)){
    taskData.crop_id=crop_id;
    taskData.form_id=form_id;
    await init();
  }
  if(taskData.crop_id==0){
    toastFunctions.showErrorMessage("Invalid Url CropId");
    return;
  }
  if(taskData.form_id==0){
    toastFunctions.showErrorMessage("Invalid From FormId");
    return;
  }
  if(taskData.trial_stations.length==0){
    toastFunctions.showErrorMessage("Setup Trial Station first");
    return;
  }
  //others initial value
  taskData.year=new Date().getFullYear();
  taskData.trial_station_id=taskData.trial_stations[0].id;

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
  taskData.permissions={};
  await axios.get(taskData.api_url+'/'+taskData.crop_id+'/'+taskData.form_id+'/initialize').then((res)=>{
    if (res.data.error == "") {
      taskData.permissions=res.data.permissions;
      taskData.cropInfo=res.data.cropInfo;
      taskData.formInfo=res.data.formInfo;
      taskData.inputFields=res.data.inputFields;
      taskData.trial_stations=res.data.trial_stations;
      taskData.seasons=res.data.seasons;
    }
    else{
      toastFunctions.showResponseError(res.data)
    }
  });
}
provide('taskData',taskData)
const resetFile=(fileId,defaultUrl)=>{
  $('#'+fileId).val('').trigger('change');
  $('#'+fileId+'_preview_container img').attr('src',systemFunctions.getImageUrl(defaultUrl));
}
if(!(globalVariables.user.id>0)){
  router.push("/login")
}
else{
  routing();
}
</script>
