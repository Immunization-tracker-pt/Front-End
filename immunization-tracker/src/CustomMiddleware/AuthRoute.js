import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from './auth';

function AuthRoute({component: Component, altPath, ...rest}){
    return (
        <Route {...rest} render = {
            props => {
                return auth.isLoggedIn() || sessionStorage.token ? 
                    <Component {...props} />
                    :
                    <Redirect to = {
                        {pathname: altPath,
                        state: {incorrectCredentials: true}
                        }
                    } />
        }
        }
        />
    )
}

export default AuthRoute;