const tg = window.Telegram.WebApp;
export function useTelegram(){

    const openLink = (url) =>{
        tg?.openLink(url)
    }
    const onClose = () =>{
        tg?.close()
    }

    const showMainButton = (props, onClick) =>{
        if(props.is_visible && onClick){
            tg?.MainButton.setParams(props);
            tg.MainButton.onClick(onClick);
            tg?.MainButton.show();
        }else{
            tg?.MainButton.hide();
            tg?.MainBuoon.offClick()
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
        if(isShow){
            tg?.BackButton.onClick(onClick)
            tg?.BackButton.show()
        }else{
            tg?.BackButton.hide()
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

