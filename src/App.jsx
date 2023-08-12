import {useTelegram} from "./hooks/useTelegram";
import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./assets/css/style.css"

const App = () => {
    const {expandApp, user} = useTelegram();
    const user_id = user ? user.id : 5467763995;

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
