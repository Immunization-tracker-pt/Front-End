import auth from '../CustomMiddleware/auth';
function Logout(props){
     auth.logout(
        () => {
            sessionStorage.clear();
            props.history.push('/login');
        }
    );
    return null;
};

export default Logout;