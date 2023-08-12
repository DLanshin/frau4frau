import React, {useEffect, useState} from "react";
import ImageUploading from 'react-images-uploading';
import CreatableSelect from 'react-select/creatable';
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
import {colors} from "../data/colors"

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
]
const Form = observer(() => {
    const mapToken = process.env.REACT_APP_MAP_TOKEN;
    const {initBackButton, user, onClose, showTelegramAlert} = useTelegram();
    const [isLoading, setIsLoading] = useState(true);
    const {settings} = UserStore;
    const maxNumber = 6;

    const user_id = user ? user.id : 5467763995;
    const [formData, setFormData] = useState({
        user_id: user_id,
        name: "",
        phone: "",
        comment: "",
        zip: "",
        country: "",
        state: "",
        city: "",
        address: "",
        flat: "",
        products: []
    });


    const [product, setProduct] = useState({
        link: "",
        sku: "",
        size: "",
        count: 1,
        images: "",
    });
    const [showFormExpanded, setShowFormExpanded] = useState(false);
    const [screen, setScreen] = useState("products")


    const handleRetrieve = (res) => {
        const feature = res.features[0];

        setFormData({
            ...formData,
            country: feature.properties.country,
            zip: feature.properties.postcode,
            state: feature.properties.address_level1,
            city: feature.properties.address_level2,
            address: feature.properties.address_line1,
            flat: feature.properties.address_line2
        })
        setShowFormExpanded(true)
    }
    const onChange = (imageList, addUpdateIndex) => {
        setProduct({...product, images: imageList});
    };

    const addProduct = (product) => {
        setFormData({...formData, products: [...formData.products, product]});
        setProduct({
            link: "",
            sku: "",
            size: "",
            count: 1,
            images: "",
        })
        setScreen("products");
    }


    const sendRequest = () => {

        OrderStore.createOrder(formData).then((res) => {
            setIsLoading(true)
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
            zip: settings?.address?.zip ?? "",
            country: settings?.address?.country ?? "",
            state: settings?.address?.state ?? "",
            city: settings?.address?.city ?? "",
            address: settings?.address?.address ?? "",
            flat: settings?.address?.flat ?? "",
        })
        setShowFormExpanded(true)
    }, [settings])

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
                    className={"button button--default"}
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
                {formData.products.length ?
                    <Button
                        className={"bottom-button"}
                        onClick={e => {
                            e.preventDefault()
                            setScreen("contacts")
                            initBackButton(true, () => {
                                setScreen("products");
                                initBackButton(false)
                            })
                        }}
                    >
                        Отправить заявку
                    </Button>
                    :
                    null
                }
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
                                        <button
                                            className={"upload-images__add-button"}
                                            style={isDragging ? {color: 'red'} : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <ReactSVG className={'svg-icon'} src={uploadIcon}/>
                                            <span>Загрузить изображения</span>
                                        </button>
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

                <form onSubmit={(e) => {
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
                            <CreatableSelect
                                className={"creatable-select"}
                                placeholder={"Выберите цвет"}
                                isClearable
                                value={product.color}
                                required={false}
                                onChange={(e) => {
                                    setProduct({...product, color: e})
                                    console.log(product)
                                }
                                }
                                options={colors}/>

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
                    <Button className={"bottom-button"} type={"submit"}>
                        Далее
                    </Button>
                </form>
            </Screen>
            <Screen className={`screen ${screen === "contacts" ? "" : "display-none"}`}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    sendRequest(e)
                }}>
                    <div className={"form-block"}>
                        <div className={"form-block__title"}>Контактные данные</div>
                        <div className="form">
                            <Input
                                required={true}
                                type={"text"}
                                name={"name"}
                                placeholder={"Ваше имя"}
                                value={formData.name}
                                onChange={(value) => setFormData({...formData, name: value})}
                            />
                            <PhoneInput
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                }}
                                defaultErrorMessage={"Обязательное поле для заполнения"}
                                placeholder={"+7 (___) ___-__-__"}
                                onlyCountries={["ru", "by", "kz"]}
                                localization={ru}
                                country={'ru'}
                                value={formData.phone}
                                onChange={(value) => setFormData({...formData, phone: value})}
                            />
                            <Input
                                type={"text"}
                                name={"comment"}
                                placeholder={"Комментарий"}
                                value={formData.comment}
                                onChange={(value) => setFormData({...formData, comment: value})}
                            />
                        </div>
                    </div>
                    <div className={"form-block"}>
                        <div className={"form-block__title"}>Адрес</div>
                        <div className="form">
                            <div className={"input-container"}>
                                <AddressAutofill
                                    accessToken={mapToken}
                                    onRetrieve={handleRetrieve}
                                    options={{
                                        language: 'ru',
                                        country: 'RU',
                                    }}
                                >
                                    <input
                                        required={true}
                                        className={"input"}
                                        name={"address"}
                                        placeholder={"Адрес"}
                                        type="text"
                                        autoComplete="address-line1"
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    />
                                </AddressAutofill>
                            </div>
                            <Input
                                className={!showFormExpanded ? 'display-none' : ""}
                                type={"text"}
                                name={"country"}
                                required={true}
                                placeholder={"Страна"}
                                autoComplete="country-name"
                                value={formData.country}
                                onChange={(value) => setFormData({...formData, country: value})}

                            />
                            <Input
                                className={!showFormExpanded ? 'display-none' : ""}
                                type={"number"}
                                name={"zip"}
                                required={true}
                                placeholder={"Индекс"}
                                autoComplete="postal-code"
                                value={formData.zip}
                                onChange={(value) => setFormData({...formData, zip: value})}

                            />
                            <Input
                                className={!showFormExpanded ? 'display-none' : ""}
                                type={"text"}
                                name={"region"}
                                required={true}
                                placeholder={"Область"}
                                autoComplete="address-level1"
                                value={formData.state}
                                onChange={(value) => setFormData({...formData, state: value})}
                            />
                            <Input
                                className={!showFormExpanded ? 'display-none' : ""}
                                type={"text"}
                                name={"city"}
                                required={true}
                                placeholder={"Город"}
                                autoComplete="address-level2"
                                value={formData.city}
                                onChange={(value) => setFormData({...formData, city: value})}
                            />
                            <Input
                                className={!showFormExpanded ? 'display-none' : ""}
                                type={"text"}
                                name={"street"}
                                required={true}
                                placeholder={"Квартира, строение"}
                                autoComplete="address-line2"
                                value={formData.flat}
                                onChange={(value) => setFormData({...formData, flat: value})}
                            />
                        </div>
                    </div>
                    <Button className={"bottom-button"} type={"submit"}>Отправить</Button>
                </form>
            </Screen>
        </div>
    );
});

export default Form;
