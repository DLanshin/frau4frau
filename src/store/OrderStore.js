import {makeAutoObservable} from "mobx";
import {$api} from "../http";

class OrderStore {
    isLoading= true
    orders = []
    count =  0
    constructor() {
        makeAutoObservable(this)
    }

    async fetchOrders() {
        await $api.get(`/orders/get`).then(({data})=>{
            this.isLoading = false;
            this.orders = data.data
            this.count = data.data.length
        });
    }
    async createOrder(orderData){
        await $api.post(`/orders/create`, {...orderData})
    }


}
export default new OrderStore();