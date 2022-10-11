<template>
  <div class="row mb-2" v-if="!inputItem.more_values">
    <div class="col-4">
      <label class="font-weight-bold float-right">{{labels.get(inputItem.label)}} <span class="text-danger" v-if="inputItem.mandatory=='Yes'">*</span></label>
    </div>
    <div class="col-lg-4 col-8">
      <div class="input-group" >
        <textarea :id="inputKey" class="form-control" :class="inputItem.class? inputItem.class:null" :name="inputItem.name">{{inputItem.default}}</textarea>
      </div>
    </div>
  </div>
  <div class="row mb-2" :id="inputKey+'_system_add_more_input_container'" v-else>
    <div class="col-4">
      <label class="font-weight-bold float-right">{{labels.get(inputItem.label)}} <span class="text-danger" v-if="inputItem.mandatory=='Yes'">*</span></label>
    </div>
    <div class="col-lg-4 col-8">
      <div class="row mb-2">
        <div class="col-12">
          <button type="button" class="system_add_more_button mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="addMore(inputItem.default)"><i class="bi bi-plus-circle"></i> {{labels.get('label_add_more')}}</button>
        </div>
      </div>
    </div>
    <div class="system_add_more_content d-none">
      <div class="row mb-2">
        <div class="col-12">
          <div class="input-group">
            <textarea class="form-control" :class="inputItem.class? inputItem.class:null">{{inputItem.default}}</textarea>
            <div class="input-group-append system_remove_more_button" style="cursor: pointer">
              <span class="input-group-text bg-gradient-danger"><i class="bi bi-dash-circle"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import systemFunctions from "@/assets/systemFunctions";
    import toastFunctions from "@/assets/toastFunctions";
    import { onMounted } from 'vue'
    import labels from '@/labels'   
    import { ref, computed } from 'vue' 
    import axios from 'axios';
    const props=defineProps({
        inputItem: {
            type: Object,
            required: true
        },
        inputKey: {
          type: String,
          required: true
        },
    })
    let current_add_more_index=0;
    onMounted(() => {
      if(props.inputItem.more_values){
        for(let i=0;i<props.inputItem.more_values.length;i++){
          addMore(props.inputItem.more_values[i]);
        }
      }
    })
    const addMore=(defaultValue)=>{
      console.log("textArea addmore")
      let curIndex=current_add_more_index;
      let html=$("#"+props.inputKey+'_system_add_more_input_container .system_add_more_content > div').clone();
      html.find('textarea').attr('id',props.inputKey+'_'+curIndex)
      html.find('textarea').attr('name',props.inputItem.name+'[]')
      html.find('textarea').val(defaultValue)
      html.find('.system_remove_more_button').on('click',(event)=>{
        removeMore(event)
      })
      $("#"+props.inputKey+'_system_add_more_input_container .system_add_more_button').parent().parent().before(html);
      current_add_more_index++;
    }
    const removeMore=(event)=>{
      console.log("Remove more")
      $(event.target).closest('.row').remove();
      //console.log(event.target)
    }
</script>


