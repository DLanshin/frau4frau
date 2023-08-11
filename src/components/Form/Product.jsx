import React from 'react';
const Product = ({images, sku, link, size, count}) => {
    return (
        <div className="product__item">
            <div className="product__item-image">
                <img src={images.length ? images[0].data_url : "https://placehold.co/100x100"}/>
            </div>
            <div className="product__item-content">
                <div className={"product__item-property"}>
                    <b>Артикул:</b> {sku}
                </div>
                <div className={"product__item-property"}>
                    <b>Ссылка:</b> <span className={"nowrap link"}>{link}</span>
                </div>
                <div className={"product__item-property"}>
                    <b>Размер</b>: {size ? size: "-"}
                </div>
                <div className={"product__item-property"}>
                    <b>Кол-во:</b>: {count} шт.
                </div>
            </div>

        </div>
);
};

export default Product;