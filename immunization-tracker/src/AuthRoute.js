import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from './auth';

function AuthRoute({component: Component, ...rest}){
    return (
        <Route {...rest} render = {
            props => {
                return auth.isLoggedIn() || sessionStorage.token ? 
                    <Component {...props} />
                    :
                    <Redirect to = {
                        {pathname: "/login",
                        state: {incorrectCredentials: true}
                        }
                    } />
        }
        }
        />
    )
}

export default AuthRoute;
