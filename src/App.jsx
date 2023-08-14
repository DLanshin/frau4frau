import {useTelegram} from "./hooks/useTelegram";
import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./assets/css/style.css"

const App = () => {
    const {expandApp, user_id} = useTelegram();

    useEffect(() => {
        expandApp();
    }, [])
    if(!user_id){
        <></>
    }
    return (
        <BrowserRouter>
            <div className="wrapper">
                <AppRouter/>
            </div>
        </BrowserRouter>
    );
};

export default App;
