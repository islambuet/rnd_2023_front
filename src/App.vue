<template>
  <div id="system_main_container">
    <Loading v-show="globalVariables.statusDataLoaded == 0" />
    <template v-if="statusSiteLoaded==1">

    </template>
  </div>
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import systemFunctions from "@/assets/systemFunctions";
  import toastFunctions from "@/assets/toastFunctions";

  import {ref,reactive } from 'vue';
  import axios from 'axios';

  import Loading from "@/components/busy-states/Loading.vue";
  axios.defaults.baseURL = 'http://192.168.0.109/base/apivue2base2/public/api/';
  axios.defaults.headers.common['language'] =globalVariables.language;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + globalVariables.user[globalVariables.localStorageAuthTokenStr];
  axios.interceptors.request.use(function (config) {
    toastFunctions.clearToast()
    globalVariables.validationErrors='';
    globalVariables.statusDataLoaded=0;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  axios.interceptors.response.use(function (response) {
    globalVariables.statusDataLoaded=1;
    return response;
  }, function (error) {
    globalVariables.statusDataLoaded=1;
    toastFunctions.showResponseError();
    return Promise.reject(error);
  });

  let statusSiteLoaded=ref(1);

  const init=async ()=>{
    await axios.get('user/initialize1').then((response)=>{
      // if(response.data.user){
      //   systemFunctions.setUser(response.data.user);
      // }
      // else{
      //   if(route.path!='/login'){
      //     router.push("/login");
      //   }
      // }
      // statusSiteLoaded.value=1;

    });
  }
  init();

</script>