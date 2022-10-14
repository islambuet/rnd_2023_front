import globalVariables from "@/assets/globalVariables";
import axios from "axios";
export default{
    changeLanguage(language)
    {
        localStorage.setItem(globalVariables.localStorageLanguageStr,language);
        window.location.reload();
    },
    setUser: function (data) {
        for (let item_key in data) {
            globalVariables.user[item_key] = data[item_key];
            if(item_key==globalVariables.localStorageAuthTokenStr){
                //set new AuthToken for axios Authorization
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + globalVariables.user[globalVariables.localStorageAuthTokenStr];
                localStorage.setItem(globalVariables.localStorageAuthTokenStr, data[item_key]);
            }
        }
    },
    getTaskBaseURL(file){
        return file.substring(file.indexOf('src/tasks')+9,file.indexOf('/Index.vue'));
    },
    getFilteredItems(data,columns){
        let filterItems= data.filter((item)=>{
            for(let  key in columns.all)
            {
                let column = columns.all[key];
                if(column.filterable){
                    if(column.type=='number'){
                        if(column.filter.from.toString().length>0){
                            if(parseFloat(item[key])<parseFloat(column.filter.from)){
                                return false;
                            }
                        }
                        if(column.filter.to.toString().length>0){
                            if(parseFloat(item[key])>parseFloat(column.filter.to)){
                                return false;
                            }
                        }
                    }
                    else if(column.type=='text'){
                        if(column.filter.from.length>0){
                            if(item[key].toLowerCase().indexOf(column.filter.from.toLowerCase())==-1)
                            {
                                return false;
                            }
                        }
                    }
                    else if(column.type=='dropdown'){
                        if(column.filter.from.length>0){
                            if(item[key]!=column.filter.from)
                            {
                                return false;
                            }
                        }
                    }
                    else if(column.type=='date'){
                        if(column.filter.from.length>0){
                            if(new Date(item[key])<new Date(column.filter.from+" 00:00:00"))
                            {
                                return false;
                            }
                        }
                        if(column.filter.to.length>0){
                            if(new Date(item[key])>new Date(column.filter.to+" 00:00:00"))
                            {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        });
        let key=columns.sort.key;
        let dir=columns.sort.dir;
        if(key!='' ){
            if((key in columns.all) &&((dir=='asc')||(dir=='desc')))
            {
                if(columns.all[key].type=='number')
                {
                    filterItems.sort((a,b)=> (a[key] > b[key] ? 1: -1 ));
                }
                else if(columns.all[key].type=='date')
                {
                    filterItems.sort((a,b)=> (new Date(a[key]) > new Date(b[key]) ? 1 : -1));
                }
                else{
                    filterItems.sort((a,b)=> (a[key].localeCompare(b[key])));
                }
                if(dir=='desc'){
                    filterItems.reverse();
                }
            }
        }
        return filterItems;
    },
    exportCsv(columns,data,filename="output.csv")
    {
        let csvStr="";
        for(let  key in columns.all){
            let column=columns.all[key];
            if((columns.hidden.indexOf(key))==-1){
                csvStr=csvStr+'"'+column.label+'",';
            }
        }
        csvStr+="\n";
        for (let j=0;j<data.length;j++)
        {
            for(let  key in columns.all){
                if((columns.hidden.indexOf(key))==-1){
                    csvStr=csvStr+'"'+data[j][key]+'",';
                }
            }
            csvStr+="\n";
        }
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvStr);
        hiddenElement.target = '_blank';
        hiddenElement.download = filename;
        hiddenElement.click();
    },
    //handle by browser
    downloadUrl(url){
        window.open(url)
    }
}