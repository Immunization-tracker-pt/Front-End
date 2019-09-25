import auth from '../CustomMiddleware/auth';
function Logout(props){
     auth.logout(
        () => {
            sessionStorage.removeItem('token');
            props.history.push('/login');
        }
    );
    return null;
};

export default Logout;