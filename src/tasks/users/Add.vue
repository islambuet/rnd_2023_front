<template>
  <div class="card d-print-none mb-2">
    <div class="card-body">
      <router-link :to="taskData.api_url" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" ><i class="feather icon-corner-up-left"></i> {{labels.get('label_back')}}</router-link>
<!--      <button  v-if="Object.keys(taskData.item).length>0" type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(false)"><i class="feather icon-save"></i> {{labels.get('button_save')}}</button>-->
<!--      <button  v-if="Object.keys(taskData.item).length>0" type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(true)"><i class="feather icon-plus-square"></i> {{labels.get('button_save_new')}}</button>-->
    </div>
  </div>

</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import systemFunctions from "@/assets/systemFunctions";
  import toastFunctions from "@/assets/toastFunctions";
  import labels from '@/labels'

  import {useRouter} from "vue-router";
  import {inject} from "vue";

  const router =useRouter()
  let taskData = inject('taskData')
  if(!(taskData.permissions.action_1)){
    toastFunctions.showAccessDenyMessage();
  }
  else{

  }

</script>