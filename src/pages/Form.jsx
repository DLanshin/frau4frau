import React, {useEffect, useState} from "react";
import ImageUploading from 'react-images-uploading';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import ru from 'react-phone-input-2/lang/ru.json'
import {ReactSVG} from "react-svg";
import uploadIcon from "../assets/images/icons/upload.svg";
import {AddressAutofill} from "@mapbox/search-js-react";
import {observer} from "mobx-react-lite";
import {useTelegram} from "../hooks/useTelegram";
import OrderStore from "../store/OrderStore";
import Loader from "../components/Common/Loader";
import Screen from "../components/Common/Screen";
import Product from "../components/Form/Product";
import Button from "../components/Form/Button";
import QuantityControl from "../components/Form/QuantityControl";
import UserStore from "../store/UserStore";
import Input from "../components/Form/Input";
import TextArea from "../components/Form/TextArea";

const Form = observer(() => {
    const {initBackButton, user_id, onClose, showMainButton} = useTelegram();
    const [isLoading, setIsLoading] = useState(true);
    const {settings} = UserStore;
    const maxNumber = 6;

    const [formData, setFormData] = useState({
        user_id: user_id,
        name: "",
        phone: "",
        recipient_name: "",
        comment: "",
        zip: "",
        country: "",
        state: "",
        city: "",
        address: "",
        products: []
    });


    const [product, setProduct] = useState({
        link: "",
        sku: "",
        size: "",
        color: "",
        count: 1,
        images: "",
    });
    const [screen, setScreen] = useState("products")



    const onChange = (imageList, addUpdateIndex) => {
        setProduct({...product, images: imageList});
    };

    const addProduct = (product) => {
        setFormData({...formData, products: [...formData.products, product]});
        setProduct({
            link: "",
            sku: "",
            size: "",
            color: "",
            count: 1,
            images: "",
        })
        setScreen("products");
    }
    const submitForm = (form) => {
        document.querySelector(form).requestSubmit();
    }
    const sendRequest = () => {
        showMainButton({is_visible:false})
        setIsLoading(true)
        OrderStore.createOrder(formData).then((res) => {
            onClose()
        })

    }
    useEffect(() => {
        UserStore.fetchSettings(user_id).then(() => {
            setIsLoading(false)
        })
    }, []);
    useEffect(() => {
        setFormData({
            ...formData,
            name: settings?.name ?? "",
            phone: settings?.phone ?? "",
            recipient_name: settings?.recipient_name ?? "",
            zip: settings?.address?.zip ?? "",
            country: settings?.address?.country ?? "",
            state: settings?.address?.state ?? "",
            city: settings?.address?.city ?? "",
            address: settings?.address?.address ?? "",
        })
    }, [settings])

    useEffect(()=>{
        if(screen === "products" && formData.products.length){
            console.log("show next button")
            showMainButton({
                text: `Далее`,
                is_visible:true
            },()=>{
                setScreen("contacts")
                initBackButton(true, () => {
                    showMainButton({is_visible:false})
                    setScreen("products");
                    initBackButton(false)
                })
            })
        }else if(screen === "contacts"){
            console.log("show add product button")
            showMainButton({
                is_visible:true,
                text: `Оформить заказ`,
            },()=>{
                submitForm("#mainForm")
            })
        }else if(screen === "add_product") {
            console.log("show add product button")
            showMainButton({
                is_visible:true,
                text: `Добавить`,
            },()=>{
                initBackButton(false);
                submitForm("#addProductForm")
            })
        }else{
            console.log("disable button")
            showMainButton({is_visible:false})
        }
    }, [formData.products.length, screen]);

    if (isLoading) {
        return (<Loader/>);
    }
    return (

        <div className={"request-form"}>
            <Screen className={`screen ${screen === "products" ? "" : "display-none"}`}>
                <div className="product">
                    {formData.products.map((item, i) => (
                        <Product
                            key={i}
                            images={item.images}
                            sku={item.sku}
                            link={item.link}
                            size={item.size}
                            count={item.count}/>
                    ))}
                </div>
                <Button
                    className={"button--lg button--default"}
                    onClick={e => {
                        e.preventDefault()
                        setScreen("add_product")
                        initBackButton(true, () => {
                            setScreen("products");
                            initBackButton(false);
                        })
                    }}
                >
                    + Добавить товар
                </Button>
                {/*<button onClick={()=>{setScreen("contacts")}}>Submit</button>*/}
            </Screen>
            <Screen className={`screen ${screen === "add_product" ? "" : "display-none"}`}>
                <div className={"form-block"}>
                    <div className={"form-block__title"}>Фотографии товара</div>
                    <div className="form">
                        <div className="upload-images">
                            <ImageUploading
                                multiple
                                value={product.images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                      imageList,
                                      onImageUpload,
                                      onImageRemove,
                                      isDragging,
                                      dragProps,
                                  }) => (
                                    // write your building UI
                                    <div className="upload-images__wrapper">
                                        {
                                            !product?.images.length ?
                                                <button
                                                    className={"upload-images__add-button"}
                                                    style={isDragging ? {color: 'red'} : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <ReactSVG className={'svg-icon'} src={uploadIcon}/>
                                                    <span>Загрузить изображения</span>
                                                </button>
                                                :
                                                null

                                        }

                                        <div className="upload-images__list">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="upload-images__item">
                                                    <img src={image['data_url']} alt="" width="100"/>
                                                    <button className={"upload-images__item-delete"}
                                                            onClick={() => onImageRemove(index)}>x
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>
                </div>
                <form id={"addProductForm"} onSubmit={(e) => {
                    e.preventDefault()
                    addProduct(product)
                    setScreen("products")
                }}>
                    <div className={"form-block"}>
                        <div className={"form-block__title"}>Информация о товаре</div>
                        <div className="form">
                            <Input
                                type={"text"}
                                name={"link"}
                                placeholder={"Ссылка на товар"}
                                required={true}
                                value={product.link}
                                onChange={(value) => {
                                    setProduct({...product, link: value})
                                }}
                            />
                            <Input
                                type={"text"}
                                name={"sku"}
                                placeholder={"Артикул товара"}
                                required={false}
                                value={product.sku}
                                onChange={(value) => setProduct({...product, sku: value})}

                            />
                            <Input
                                name="size"
                                placeholder="Размер"
                                value={product.size}
                                required={false}
                                onChange={(value) => setProduct({...product, size: value})}
                            />
                            <Input
                                name="color"
                                placeholder="Цвет"
                                value={product.color}
                                required={false}
                                onChange={(value) => setProduct({...product, color: value})}
                            />

                            <div className={"input-container input-container--row"}>
                                <label>Кол-во</label>
                                <QuantityControl
                                    count={product.count}
                                    incrementAction={(e) => {
                                        setProduct({...product, count: product.count + 1})
                                    }}
                                    decrementAction={(e) => {
                                        setProduct({...product, count: product.count === 1 ? 1 : product.count - 1})
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                    {/*<button type={"submit"}>Submit</button>*/}
                </form>
            </Screen>
            <Screen className={`screen ${screen === "contacts" ? "" : "display-none"}`}>
                <form id={"mainForm"} onSubmit={(e) => {
                    e.preventDefault()
                    sendRequest(e)
                }}>
                    <div className={"form-block"}>
                        <div className="form">
                            <Input
                                required={true}
                                type={"text"}
                                name={"name"}
                                placeholder={"Ваше имя"}
                                value={formData.name}
                                onChange={(value) => setFormData({...formData, name: value})}
                            />
                        </div>
                    </div>
                    <div className={"form-block"}>

                        <div className={"form-block__title"}>Почтовые реквизиты получателя<br/> <small>(заполнять латиницей)</small></div>
                        <div className="form">
                            <Input
                                required={true}
                                type={"text"}
                                name={"recipient_name"}
                                placeholder={"Фамилия, имя получателя"}
                                value={formData.recipient_name}
                                onChange={(value) => setFormData({...formData, recipient_name: value})}
                            />
                            <PhoneInput
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                }}
                                defaultErrorMessage={"Обязательное поле для заполнения"}
                                placeholder={"+7 (___) ___-__-__"}
                                // onlyCountries={["ru", "by", "kz"]}
                                localization={ru}

                                country={'ru'}
                                value={formData.phone}
                                onChange={(value) => setFormData({...formData, phone: value})}
                            />
                        </div>
                        <div className="form">
                            <Input
                                type={"text"}
                                name={"country"}
                                required={true}
                                placeholder={"Страна"}
                                value={formData.country}
                                onChange={(value) => setFormData({...formData, country: value})}

                            />
                            <Input
                                type={"number"}
                                name={"zip"}
                                required={true}
                                placeholder={"Индекс"}
                                value={formData.zip}
                                onChange={(value) => setFormData({...formData, zip: value})}

                            />
                            <Input
                                type={"text"}
                                name={"region"}
                                required={false}
                                placeholder={"Регион"}
                                value={formData.state}
                                onChange={(value) => setFormData({...formData, state: value})}
                            />
                            <Input
                                type={"text"}
                                name={"city"}
                                required={true}
                                placeholder={"Город"}
                                value={formData.city}
                                onChange={(value) => setFormData({...formData, city: value})}
                            />
                            <Input
                                type={"text"}
                                name={"address"}
                                required={true}
                                placeholder={"Улица, дом, квартира"}
                                value={formData.address}
                                onChange={(value) => setFormData({...formData, address: value})}
                            />
                        </div>
                    </div>
                    <div className={"form-block"}>
                        <div className="form">
                            <TextArea
                                name={"comment"}
                                placeholder={"Комментарий к заказу"}
                                value={formData.comment}
                                onChange={(value) => setFormData({...formData, comment: value})}
                            />
                        </div>
                    </div>
                    {/*<button type={"submit"}>Submit</button>*/}
                </form>
            </Screen>
        </div>
    );
});

export default Form;
