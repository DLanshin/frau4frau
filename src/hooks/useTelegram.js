import SettingsStore from "../store/SettingsStore";

const tg = window.Telegram.WebApp;
export function useTelegram(){

    const openLink = (url) =>{
        tg?.openLink(url)
    }
    const onClose = () =>{
        tg?.close()
    }

    const showMainButton = (props, onClick) =>{
        if(process.env.REACT_APP_MODE === "dev"){
            const {mainButton} = SettingsStore;
            mainButton.onClick = onClick
            mainButton.show = props.is_visible
            mainButton.text = props.text ?? ""
        }
        if(props.is_visible && onClick){
            tg?.MainButton.setParams(props);
            tg?.MainButton.show();
            tg.onEvent('mainButtonClicked', onClick)
        }else{
            tg.offEvent('mainButtonClicked', onClick)
            tg?.MainButton.hide();
        }
    }
    const showTelegramAlert = (message, callback) =>{
        tg?.showAlert(message, callback)
    }
    const showTelegramConfirm = (message, callback) => {
        tg?.showConfirm(message,callback)
    }
    const expandApp = () =>{
        tg?.expand()
    }

    const closeApp = () =>{
        tg?.close()
    }
    const initBackButton = (isShow, onClick) => {
        if(process.env.REACT_APP_MODE === "dev"){
            const { backButton} = SettingsStore;
            backButton.onClick = onClick
            backButton.show = isShow
        }
        if(isShow){
            tg?.BackButton.onClick(()=>{
                onClick()
                tg?.BackButton.hide()
            })
            tg?.BackButton.show()
        }
    }
    return {
        tg,
        user:tg.initDataUnsafe?.user,
        user_id:process.env.REACT_APP_MODE === 'dev' ? 321802111 : tg.initDataUnsafe?.user?.id,
        onClose,
        showMainButton,
        showTelegramConfirm,
        showTelegramAlert,
        expandApp,
        initBackButton,
        closeApp,
        openLink
    }
}

