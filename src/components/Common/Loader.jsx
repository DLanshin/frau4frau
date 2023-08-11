import React from 'react';
import cartIcon from '../../assets/images/icons/cart.svg'
import {ReactSVG} from "react-svg";
const Loader = (props) => {
    return (
        <div className="preloader">
            <ReactSVG className={'svg-icon'} src={cartIcon}/>
            <div className="preloader__text">
                <p className="preloader__msg">Bringing you the goods…</p>
                <p className="preloader__msg preloader__msg--last">This is taking long. Something’s wrong.</p>
            </div>
        </div>
    );
};

export default Loader;