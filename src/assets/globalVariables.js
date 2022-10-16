import {reactive } from 'vue';

const localStorageAuthTokenStr = 'authToken';
const localStorageLanguageStr='language';
const language = localStorage.getItem(localStorageLanguageStr) ? localStorage.getItem(localStorageLanguageStr) : 'bn';
function getNotLoggedUser(){
  return {
    authToken: localStorage.getItem(localStorageAuthTokenStr) ? localStorage.getItem(localStorageAuthTokenStr) : '',
    id: 0,
    name: language == 'en' ? 'Guest' : 'অতিথি',
    infos:{},
    profile_picture: '',
    tasks: {}
  }    
}
export default reactive({
  baseURLApiServer:'http://192.168.0.109/rnd_2023_back/public/api',
  baseURLUploadServer:'http://192.168.0.109/uploads/public/api',
  baseURLUploadedFilesLink:'http://192.168.0.109/uploads/public',
  localStorageAuthTokenStr:localStorageAuthTokenStr,
  localStorageLanguageStr:localStorageLanguageStr,
  baseUrl: process.env.BASE_URL,
  statusDataLoaded: 1,    //Loading=0,loaded=1
  uploadingFiles:0,
  validationErrors:'',
  language: language,
  language_available:['en','bn'],
  user: getNotLoggedUser(),  
  logout() {    
    this.user = getNotLoggedUser();
  },
  loadListData:true,
})
