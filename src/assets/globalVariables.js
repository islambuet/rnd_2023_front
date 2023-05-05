import {reactive } from 'vue';

const localStorageAuthTokenStr = 'authToken';
const localStorageLanguageStr='language';
const language = localStorage.getItem(localStorageLanguageStr) ? localStorage.getItem(localStorageLanguageStr) : 'en';
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
  baseURLApiServer:(process.env.NODE_ENV=='production')?'https://rnd.api.malikseedsbd.com/api':'http://192.168.179.1/rnd_2023_back/public/api',
  baseURLUploadServer:'https://rnd.files.malikseedsbd.com/api',
  baseURLUploadedFilesLink:'https://rnd.files.malikseedsbd.com',
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
  starting_year:2023, //TODO change it to 2023
  current_year:new Date().getFullYear(),
  current_season_id:1
})
