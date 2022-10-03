<template>    
  <div class="main container">
    <div class="row justify-content-md-center center-align">
        <div class="col-xl-8 col-12 shadow px-0">
            <div class="card bg-authentication rounded-0 mb-0">
                    <div class="row m-0">
                        <div class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                            <img :src="globalVariables.baseUrl+'theme/images/login.png'" alt="branding logo">
                        </div>
                        <div class="col-lg-6 col-12 p-0">
                            <div class="card mb-0">
                                <div class="card-header pb-1">
                                    <div class="card-title">
                                        <h4 class="mb-0">{{ labels.get('label_login') }}</h4>
                                    </div>
                                </div>
                                <p class="px-2">{{ labels.get('label_welcome') }}</p>
                                <div class="card-content">
                                    <div class="card-body pt-1">
                                        <form @submit.prevent="login" id="formLogin">
                                          <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                              <span class="input-group-text"><i class="feather icon-user"></i></span>
                                            </div>
                                            <input type="text" class="form-control" id="user-name" :placeholder="labels.get('label_username')" name="username" value="0500454" required="" />                                                    
                                          </div>                                                  
                                          <div class="input-group mb-3">
                                            <div class="input-group-prepend eye_password">
                                              <span class="input-group-text" ><i class="feather icon-eye"></i></span>
                                            </div>
                                            <input type="password" class="form-control" :placeholder="labels.get('label_password')" name="password" value="12345678" required="" />
                                          </div>
                                            <button type="submit" class="btn btn-primary btn-inline waves-effect waves-light float-right">{{ labels.get('label_login') }}</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="login-footer">
                                  <!-- <router-link to="/users-groups">asdfasdf</router-link> -->
                                </div>
                            </div>
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
  import labels from '@/labels'
  import { reactive } from 'vue'
  import {useRoute,useRouter} from 'vue-router';
  import axios from 'axios';
  const route =useRoute()
  const router =useRouter()
  let taskData=reactive({
    taskBaseUrl:systemFunctions.getTaskBaseURL(import.meta.url)
  })
  labels.add([{language:globalVariables.language,file:'tasks'+taskData.taskBaseUrl+'/labels.js'}])

  const init=()=>{
    if(globalVariables.user.id>0){        
      router.push("/");
    }      
  }
  init();

  const login=()=>{
    let formData=new FormData(document.getElementById('formLogin')); 
    axios.post("user/login", formData)
      .then((res) => {
        if (res.data.error == "") {
          systemFunctions.setUser(res.data.user);
          router.push("/");
        }
      })
  }
</script>


<style  scoped>
.main {
   height: auto;
}

.login-left {
  background: #0d6efd;
}

.login-left > img {
  margin-left: 12%;
}

.center-align {
  /*margin-top: 20vh;*/
  margin-right: 0px;
  margin-left: 0px;
}

.center-align > div{
  margin-top: 20vh;
}

.bg-authentication {
  background-color: #eff2f7;
}

.bg-authentication .login-footer {
  padding: 0rem 1.5rem 3.5rem;
}

.bg-authentication .login-footer .footer-btn .btn {
  padding: 0.9rem 1.2rem !important;
  margin: 1rem 1rem 1rem 0rem;
}

#user-password {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.input-group-text {
  background-color: #ffffff;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .bg-authentication {
    width: 100%;
  }
  .center-align {
    margin-top: 20vh;
  }
}
</style>
