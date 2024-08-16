import React from "react";
import { Navigate } from  'react-router-dom';

const PrivateRoute = ({children}) =>{
    // check if the user is authenticated
    const isAuthenticated = localStorage.getItem('token'); 

    if(isAuthenticated){
        //if the user is authenticated, redirect them to the dashboard
        return <Navigate to="/dashboard" />;
    }

    // if the user is not authenticated, render the children components (e.g., Login or Register)
    return children;
};

export default PrivateRoute;