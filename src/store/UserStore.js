import {makeAutoObservable} from "mobx";
import {$api} from "../http";

class UserStore {
    settings = {
        "phone":'',
        "address": {
            "country": '',
            "zip": '',
            "state": '',
            "city": '',
            "address": '',
            "flat": ''
        }
    }
    constructor() {
        makeAutoObservable(this)
    }

    async fetchSettings(user_id) {
        await $api.get(`/settings/get/${user_id}`).then(({data})=>{
            this.settings = data.data
        });
    }

}
export default new UserStore();