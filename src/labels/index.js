import globalVariables from "@/assets/globalVariables";
let lang_files=[
    "./action",
    './button',
    './label',
    './message',
    './response'
]
let labels={};
for(let i=0;i<lang_files.length;i++){
   let label=require(`${lang_files[i]}`).default;
   for (let item in label) {
        labels[item] = label[item][globalVariables.language] ? label[item][globalVariables.language] : item;            
    }
}
export default {
    labels:labels,
    add:function(taskLabels){        
        for (let item in taskLabels) {
            this.labels[item] = taskLabels[item][globalVariables.language] ? taskLabels[item][globalVariables.language] : item;    
        }
    },    
    get: function(key){
        return this.labels[key] ? this.labels[key] : key;
    }
    
}
