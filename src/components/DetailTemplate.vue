<template>
    <template  v-for="detailField in detailFields" >
      <div class="row mb-2">
        <div class="col-4">
          <label class="font-weight-bold float-right">{{labels.get(detailField.label)}}</label>
        </div>
        <div class="col-lg-4 col-8">
          <div class="row mb-2" v-for="fieldValue in detailField.values" >
            <div class="col-12" v-if="detailField.type=='image'">
              <img style="max-width: 100%;max-height:200px" :src="(fieldValue)">
            </div>
            <div class="col-12" v-else-if="detailField.type=='file'">
              <button type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="systemFunctions.downloadUrl(fieldValue)"><i class="feather icon-download"></i> {{labels.get('label_download')}}</button>

<!--              <a :href="'http://localhost:8080/rnd_2023/favicon.ico'" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" download><i class="feather icon-download"></i> {{labels.get('label_download')}}</a>-->
<!--              <a class="mr-2 mb-2 btn btn-sm bg-gradient-primary">Download</a>-->
<!--              <a href="/images/myw3schoolsimage.jpg" download>-->
<!--                <img src="/images/myw3schoolsimage.jpg" alt="W3Schools">-->
<!--              </a>-->
            </div>
            <div class="col-12" v-else>
              {{fieldValue}}
            </div>
          </div>

        </div>
      </div>
    </template>
</template>
<script setup>
    import systemFunctions from "@/assets/systemFunctions";
    import labels from '@/labels'   

    const props=defineProps({
      detailFields: {
            type: Object,
            required: true
        },        
        
    })

    
</script>


