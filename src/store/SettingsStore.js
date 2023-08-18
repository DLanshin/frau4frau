import {makeAutoObservable} from "mobx";

class SettingsStore {
    mainButton = {
        show:false,
        text:"Кнопка",
        onClick:null
    }
    backButton = {
        show:false,
        onClick:null
    }

    constructor() {
        makeAutoObservable(this)
    }



}

export default new SettingsStore();