import {observer} from "mobx-react-lite";
import OrderStore from "../store/OrderStore";
import {useEffect} from "react";
import Loader from "../components/Common/Loader";
import OrderCard from "../components/Order/OrderCard";

const Orders = observer(() => {
    const {orders, isLoading} = OrderStore;
    useEffect(()=>{
        OrderStore.fetchOrders();
    },[]);
    if(isLoading){
        return <Loader/>
    }
    return (
        <div className="orders">
            {orders.length ?
                <div className="orders__list">
                    {
                        orders.map((order)=>(
                            <OrderCard key={order.id} object={order}/>
                        ))
                    }
                </div>
                :
                <div className={'empty opacity-4'}>
                    <div className="empty__text">
                        У вас пока что нет заказов
                    </div>
                </div>
            }
        </div>
    );
})
export default Orders;
