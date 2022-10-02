<template>
     
      <Header/>
      <SidebarLeft/>
      <!-- <SidebarRight/>       -->
      <div id="system_content">                    
        <router-view/>
      </div>
    
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import Header from "./Header.vue";
  import SidebarLeft from "./SidebarLeft.vue";
  import LoadingAccessDeny from "@/components/busy-states/LoadingAccessDeny.vue";
  import SiteOffline from "@/components/busy-states/SiteOffline.vue";

</script>

<!-- <script>
import Header from "./Header.vue";
import SidebarLeft from "./SidebarLeft.vue";
import SidebarRight from "./SidebarRight.vue";
import LoadingAccessDeny from "@/components/busy-states/LoadingAccessDeny.vue";
import SiteOffline from "@/components/busy-states/SiteOffline.vue";


export default {
  components: {
    Header,
    SidebarLeft,
    SidebarRight,
    // Footer,
    SiteOffline,
    LoadingAccessDeny,
  },
  mounted(){
    // var divScripts = document.getElementById('system_load_js');
    // let newScript = document.createElement('script');
    // newScript.src = 'theme/js/main.js';    
    // divScripts.appendChild(newScript);
  }
};
</script> -->
