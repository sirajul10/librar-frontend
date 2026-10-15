import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router';
import Login from '../pages/Login';

const PrivateRoute = ({children}) => {
    const {authUser,loading} = useContext(AuthContext);
    if(loading)
    {
        return <p>Loading.....</p>
    }
    if(!authUser)
    {
        return <Navigate to={"/login"}></Navigate>
    }
    return children;
};

export default PrivateRoute;