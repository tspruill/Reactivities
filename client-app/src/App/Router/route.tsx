import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import ActivtyDetails from "../../Features/Activities/Details/ActivtyDetails";
import ActivityForms from "../../Features/Activities/Forms/ActivityForms";
import App from "../Layout/App";

export const routes : RouteObject[] = [
    {
        path:'/',
        element: <App />,
        children:[
            {path: 'activities', element:<ActivityDashboard/>},
            {path: 'activities/:id', element:<ActivtyDetails/>},
            {path: 'createActivity', element:<ActivityForms key='create'/>},
            {path: 'manage/:id', element:<ActivityForms key='manage' />},


        ]
    }
]

export  const router = createBrowserRouter(routes);