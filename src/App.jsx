import {useTelegram} from "./hooks/useTelegram";
import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./assets/css/style.css"
import SettingsStore from "./store/SettingsStore";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    const {expandApp, user_id} = useTelegram();
    const {mainButton, backButton} = SettingsStore
    useEffect(() => {
        expandApp();
    }, [])
    if (!user_id) {
        <></>
    }
    return (
        <BrowserRouter>
            <div className="wrapper">
                <AppRouter/>
            </div>
            {process.env.REACT_APP_MODE === "dev" ?
                (
                    <div>
                        <button onClick={backButton.onClick} className={`back-button ${backButton.show ? "" : "d-none"}`} >BACK</button>
                        <button onClick={mainButton.onClick} className={`main-button ${mainButton.show ? "" : "d-none"}`} >{mainButton.text}</button>
                    </div>
                )
                : ""}
        </BrowserRouter>
    );
});

export default App;
