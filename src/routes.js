import Orders from "./pages/Orders";
import Form from "./pages/Form";


export const routes = [
    {
        path: "/",
        Component: <Form/>,
    },
    {
        path: "/orders",
        Component: <Orders/>,
    },
];