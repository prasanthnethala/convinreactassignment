import React from "react";
import App from "./App";
import History from "./components/History";

const Routes = [
{
    path: "/",
    element: <App />,
},
{
    path: "/history",
    element: <History />,
},
]

export default Routes;