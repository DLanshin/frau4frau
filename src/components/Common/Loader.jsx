import React from 'react';
import cartIcon from '../../assets/images/icons/cart.svg'
import {ReactSVG} from "react-svg";
const Loader = () => {
    return (
        <div className="preloader">
            <ReactSVG className={'svg-icon'} src={cartIcon}/>
            <div className="preloader__text">
                <p className="preloader__msg">Идет загрузка…</p>
                <p className="preloader__msg preloader__msg--last">Слишком долго загружается? Возможно вы загрузили изображения большего размера</p>
            </div>
        </div>
    );
};

export default Loader;