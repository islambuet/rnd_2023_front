import globalVariables from "@/assets/globalVariables";
import ResponseError from "@/components/busy-states/ResponseError.vue";
import ResponseFileServerError from "@/components/busy-states/ResponseFileServerError.vue";
import AccessDeny from "@/components/busy-states/AccessDeny.vue";
// import SiteOffline from "@/components/busy-states/SiteOffline.vue";
import labels from "@/labels";
import { useToast } from "vue-toastification";
const toast = useToast();
export default{
    clearToast() {
        toast.clear();
    },
    showSuccessfullySavedMessage(){
        this.showSuccessMessage("Need to write message for this")
    },
    showSuccessMessage(msg) {
        toast.success(msg, {timeout: 2000 });
    },
    showResponseError() {
        if(globalVariables.uploadingFiles==1){
            toast.error(ResponseFileServerError);
        }
        else{
            toast.error(ResponseError);
        }

    },
    showAccessDenyMessage() {
        toast(AccessDeny);
    },
    // showApiOfflineMessage() {
    //     toast(SiteOffline);
    // },
    //
    // showResponseError(data) {
    //     //console.log(error);
    //     if (data.error == 'ACCESS_DENIED') {
    //        this.showAccessDenyMessage()
    //     }
    //     else if (data.error == 'API_OFFLINE') {
    //         this.showApiOfflineMessage()
    //     }
    //     else if (data.error == 'USER_SESSION_EXPIRED') {
    //         globalVariables.logout();
    //         //this.$routes.push("/login");
    //         toast.error(labels.get(data.errorMessage));
    //     }
    //     else if (data.error == 'VALIDATION_FAILED') {
    //         if(typeof data.errorMessage=='string'){
    //             globalVariables.validationErrors = data.errorMessage;
    //         }else if(typeof data.errorMessage=='object'){
    //             let messages='';
    //             for (let message in data.errorMessage) {
    //                 messages+=data.errorMessage[message]+'<br>';
    //               }
    //               globalVariables.validationErrors = messages;
    //         } else{
    //             toast.error(data.errorMessage);
    //         }
    //     }
    //     else if (data.error == 'DATA_ALREADY_SAVED') {
    //         toast.error(labels.get('DATA_ALREADY_SAVED'));
    //         globalVariables.loadListData=true;
    //     }
    //     else {
    //         toast.error(labels.get(data.errorMessage));
    //     }
    //
    // },
}