<template>
    <div>
        <section id="description" class="card">
            <div class="card-header">
                <h4 class="card-title">Welcome</h4>
            </div>
            <div class="card-content">
                <div class="card-body">
                    <div class="card-text">
                      {{globalVariables.user.name}}
                    </div>
                </div>
            </div>
        </section>
        <!--/ Description -->
    </div>
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables"; 
    import {useRoute,useRouter} from 'vue-router';
    const route =useRoute()
    const router =useRouter()  
    if(!(globalVariables.user.id>0)){
        router.push("/login")
    }    
</script>

