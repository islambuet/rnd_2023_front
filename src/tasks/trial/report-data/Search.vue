<template>
  <div class="card d-print-none mb-2">
    <div class="card-header d-print-none">
      {{taskData.cropInfo.name}}-{{taskData.reportInfo.name}}
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <div class="row mb-2">
            <div class="col-6">
              <label class="font-weight-bold float-right">{{labels.get('label_year')}} <span class="text-danger">*</span></label>
            </div>
            <div class="col-6">
              <div class="input-group" >
                <select id="year" class="form-control">
                  <option v-for="i in (globalVariables.current_year+2-globalVariables.starting_year)" :value="i+globalVariables.starting_year-1" :selected="(i+globalVariables.starting_year-1)==taskData.year">
                    {{i+globalVariables.starting_year-1}}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="font-weight-bold float-right">{{labels.get('label_trial_station')}} <span class="text-danger">*</span></label>
            </div>
            <div class="col-6">
              <div class="input-group" >
                <select id="trial_station_id" class="form-control">
                  <option v-for="trial_station in taskData.trial_stations" :value="trial_station.id" :selected="trial_station.id==taskData.trial_station_id">
                    {{trial_station.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="font-weight-bold float-right">{{labels.get('label_season')}} <span class="text-danger">*</span></label>
            </div>
            <div class="col-6">
              <div class="input-group" >
                <select id="season_id" class="form-control">
                  <option value="0">{{labels.get('label_select')}}</option>
                  <option v-for="season in taskData.seasons" :value="season.id" :selected="season.id==taskData.season_id">
                    {{season.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card-header d-print-none pl-0">
            <div class="form-check">
              <input class="form-check-input select_all" type="checkbox" :data-type="'select_varieties'">
              <label class="form-check-label">
                {{ labels.get('Select All Varieties') }}
              </label>
            </div>
          </div>
          <form id="formSearch">
            <div class="form-check" v-for="variety in taskData.varieties">
              <label class="form-check-label">
                <input class="form-check-input select_varieties" name="variety_ids[]" type="checkbox" :value="variety.variety_id">
                {{variety.rnd_code}}
              </label>
            </div>
          </form>
          <button  type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="search"><i class="feather icon-save"></i> {{labels.get('label_search')}}</button>
        </div>
      </div>

    </div>
  </div>
  <div class="card" v-if="show_report">
    <div class="card-body" style="overflow-x: auto; min-height: 250px;">
      <table class="table table-bordered">
        <thead class="table-active">
        <tr>
          <th class="align-middle text-center" rowspan="2">Rnd code</th>
          <th v-for="field in taskData.reportFields" :rowspan="field.max_entry_no>1?1:2" class="align-middle text-center" :colspan="field.max_entry_no">
            {{field.label}}
          </th>
        </tr>
        <tr>
          <template v-for="field in taskData.reportFields" >
            <th v-for="index in field.max_entry_no" class="align-middle text-center" v-if="field.max_entry_no>1" >{{index}}</th>
          </template>
        </tr>
        </thead>
        <tbody class="table-striped table-hover">
          <tr v-for="item in taskData.itemsFiltered">
            <td>{{item.rnd_code}}</td>
            <template v-for="field in taskData.reportFields" >
              <td v-for="index in field.max_entry_no" :class="((['number'].indexOf(field.type) != -1)?'text-right':'')" >
                <template v-if="item[field.index+'_'+index]">
                  <div>{{item[field.index+'_'+index]}}</div>
                </template>
                <div v-else>No Data</div>

              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import systemFunctions from "@/assets/systemFunctions";

    import labels from '@/labels'
    import {inject, reactive, ref} from 'vue'
    import {useRouter} from 'vue-router';
    import axios from "axios";
    import toastFunctions from "@/assets/toastFunctions";


    // import AddEdit from './AddEdit.vue'


    const router =useRouter()
    let taskData = inject('taskData')
    let show_report=ref(false)

    const setColumns=()=>{
      let columns={}
      let key='rnd_code';
      columns[key]={
        label: labels.get('label_'+key),
        hideable:true,
        filterable:true,
        sortable:true,
        type:'text',
        filter:{from:'',to:''}
      };
      key='num_entry';
      columns[key]={
        label: labels.get('label_'+key),
        hideable:true,
        filterable:true,
        sortable:true,
        type:'number',
        filter:{from:'',to:''},
        class:'col_1'
      };
      taskData.columns.all=columns
    }
    const search=async ()=>{
      show_report.value=false;
      let formData=new FormData(document.getElementById('formSearch'))
      await axios.post(taskData.api_url+'/'+taskData.crop_id+'/'+taskData.report_id+'/'+taskData.trial_station_id+'/'+taskData.year+'/'+taskData.season_id+'/get-items',formData).then((res)=>{
        if (res.data.error == "") {
          //console.log("hi")
          //setColumns();
          taskData.reportFields=res.data.reportFields;
          taskData.itemsFiltered=res.data.data;
          show_report.value=true;
        }
        else{
          toastFunctions.showResponseError(res.data)
        }
      });
    }

    const changeUrl=()=>{
      show_report.value=false;
      let year=$('#year').val();
      let trial_station_id=$('#trial_station_id').val();
      let season_id=$('#season_id').val();
      globalVariables.loadListData=true;
      taskData.varieties={}
      router.push(taskData.api_url+'/'+taskData.crop_id+'/'+taskData.report_id+'/'+trial_station_id+'/'+year+'/'+season_id)
    }
    $(document).ready(function()
    {
      $(document).off("change", "#year,#trial_station_id,#season_id");
      $(document).on("change",'#year,#trial_station_id,#season_id',function()
      {
        changeUrl();
      })
    });

</script>

