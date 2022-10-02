<template>
  <div id="system_main_container">
  </div>
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import systemFunctions from "@/assets/systemFunctions";
  import toastFunctions from "@/assets/toastFunctions";

  import {ref,reactive } from 'vue';
  import axios from 'axios';

  axios.defaults.baseURL = 'http://192.168.0.109/base/apivue2base2/public/api/';
  axios.defaults.headers.common['language'] =globalVariables.language;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + globalVariables.user[globalVariables.localStorageAuthTokenStr];
  axios.interceptors.request.use(function (config) {
    toastFunctions.clearToast()
    globalVariables.validationErrors='';
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

</script>