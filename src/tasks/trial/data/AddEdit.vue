<template>
  <div class="card d-print-none mb-2">
    <div class="card-body">
      <router-link :to="(taskData.api_url+'/'+taskData.crop_id+'/'+taskData.form_id+'/'+taskData.trial_station_id+'/'+taskData.year+'/'+taskData.season_id)" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" ><i class="feather icon-corner-up-left"></i> {{labels.get('label_back')}}</router-link>
      <template v-if="item.exists">
        <button  type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(false)"><i class="feather icon-save"></i> {{labels.get('label_save')}}</button>
      </template>
    </div>
  </div>
  <div class="card d-print-none mb-2" v-if="item.exists">
    <div class="card-header">
      {{taskData.year}}-{{item.season_name}}-{{taskData.cropInfo.name}}-{{taskData.formInfo.name}}-({{item.variety.rnd_code}})
    </div>
    <div class="card-body">
      <form id="formSaveItem">
        <input type="hidden" name="save_token" :value="new Date().getTime()">
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
        <template v-for="inputItem in taskData.inputFields">
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
      </form>
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


const route =useRoute()
const router =useRouter()
let taskData = inject('taskData');
console.log(taskData)
let item=reactive({
  variety_id:0,
  variety:{},
  season_name:'',
  exists:false,
  entry_no:0,
  data:{
  }
})
const save=async ()=>{
  console.log('save');
  //add formdata year,trailstation,variety_id,entry_no
}
const getItem=async ()=>{
  item.variety_id=route.params['variety_id'];
  item.entry_no=route.params['entry_no'];
  for(let i in taskData.items){
    let variety=taskData.items[i];
    if(variety.variety_id==item.variety_id){
      item.variety=variety;
    }
  }
  for(let i=0;i<taskData.seasons.length;i++){
    let season=taskData.seasons[i];
    if(season.id==taskData.season_id){
      item.season_name=season.name;
    }
  }
  item.exists=true;
}
getItem();
</script>