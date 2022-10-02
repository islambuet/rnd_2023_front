import {reactive } from 'vue';

const localStorageAuthTokenStr = 'authToken';
const localStorageLanguageStr='language';
const language = localStorage.getItem(localStorageLanguageStr) ? localStorage.getItem(localStorageLanguageStr) : 'bn';
function getNotLoggedUser(){
  return {
    authToken: localStorage.getItem(localStorageAuthTokenStr) ? localStorage.getItem(localStorageAuthTokenStr) : '',
    id: 0,
    name: language == 'en' ? 'Guest' : 'অতিথি',
    info:{},
    profile_picture_url: '',
    tasks: []
  }    
}
export default reactive({
  localStorageAuthTokenStr:localStorageAuthTokenStr,
  localStorageLanguageStr:localStorageLanguageStr,
  baseUrl: process.env.BASE_URL, 
  imageBaseUrl:'http://localhost/rnd_2023_upload/public/',
  statusDataLoaded: 1,    //Loading=0,loaded=1
  validationErrors:'',
  language: language,
  language_available:['en','bn'],
  user: getNotLoggedUser(),  
  logout() {    
    this.user = getNotLoggedUser();
  },
  loadListData:true,
})
