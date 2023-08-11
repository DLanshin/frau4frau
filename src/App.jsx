import {useTelegram} from "./hooks/useTelegram";
import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./css/style.css"

const App = () => {
    const {expandApp} = useTelegram();
    useEffect(() => {
        expandApp();
    }, [])
    return (
        <BrowserRouter>
            <div className="wrapper">
                <AppRouter/>
            </div>
        </BrowserRouter>
    );
};

export default App;
