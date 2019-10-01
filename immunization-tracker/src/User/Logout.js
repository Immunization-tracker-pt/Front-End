import auth from '../CustomMiddleware/auth';
function Logout(props){
     auth.logout(
        () => {
            sessionStorage.clear();
            alert('Logout Succesful!')
            props.history.push('/login');
        }
    );
    return null;
};

export default Logout;