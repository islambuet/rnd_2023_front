<template>
    <div>
        <div class="box">
            <div class="d-flex align-items-center justify-content-center">
                <div class="card shadow px-4 py-4">
                    <div class="row d-flex align-items-center justify-content-center mb-1">
                        <div class="col-8 text-center">
                            <img :src="globalVariables.baseUrl+'theme/images/loading-failed.png'" alt="">
                        </div>
                    </div>
                    <div class="row d-flex align-items-center justify-content-center mb-2">
                        <div class="col-8 text-center">
                        <h2>{{labels.get('msg_loading_failed_title')}}</h2>
                        </div>
                    </div>
                    <div class="row d-flex align-items-center justify-content-center ">
                        <div class="col-8 text-center">
                        <h4>{{labels.get('msg_loading_failed_message')}}</h4>
                        <button @click.prevent="reloadPage" class="btn btn-danger">{{labels.get('action_refresh')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import labels from '@/labels' 
    const reloadPage=()=>{
        window.location.reload();
    } 
    </script>
<style  scoped>
.card{
    background: #ffffff;
}
.box {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
    }
</style>