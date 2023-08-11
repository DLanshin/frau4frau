import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";

const OrderCard = ({object}) => {
    const {openLink} = useTelegram();
    return (
        <div className={"order-card"}>
            <div className="order-card__header">
                <div className="order-card__title">
                    {object?.created_at} #{object.id}
                </div>
            </div>
            <div className="order-card__body">
                <div className="order-card__info order-card__info--hint">
                    {object?.address?.zip} {object?.address?.country} {object?.address?.state} {object?.address?.city} {object?.address?.address} {object?.address?.flat}
                </div>
                <div className="order-card__info order-card__info--hint">
                    {object?.comment}
                </div>
                <div className="order-card__info">
                    <ul>
                        {
                            object?.products.map(product=>(
                                <li key={product?.id}>
                                    {product?.sku}  | {product?.size} | {product?.color} | {product?.count+' шт.'} - <span onClick={()=>{openLink(product?.link)}} className={'link'}>Ссылка</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;