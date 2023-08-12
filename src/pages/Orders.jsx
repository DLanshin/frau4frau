import {observer} from "mobx-react-lite";
import OrderStore from "../store/OrderStore";
import {useEffect} from "react";
import Loader from "../components/Common/Loader";
import OrderCard from "../components/Order/OrderCard";
import {useTelegram} from "../hooks/useTelegram";

const Orders = observer(() => {
    const {orders, isLoading} = OrderStore;
    const {user} = useTelegram();
    const user_id = user ? user.id : null;

    useEffect(()=>{
        OrderStore.fetchOrders(user_id);
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
