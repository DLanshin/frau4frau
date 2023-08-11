import {makeAutoObservable} from "mobx";
import {$api} from "../http";

class UserStore {
    settings = {
        "phone": '',
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
        await $api.get(`${process.env.REACT_APP_API_URL}/settings/get/${user_id}`).then(({data}) => {
            if (data) {
                this.settings = data?.data
            }
        });
    }

}

export default new UserStore();