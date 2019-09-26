class Auth{
    constructor(){
        this.loggedIn = false;
    }

    login(next){
        console.log('logging in');
        this.loggedIn = true;
        next();
    }

    logout(next){
        this.loggedIn = false;
        next();
    }

    isLoggedIn(){
        console.log('checking...', this.loggedIn);
        return this.loggedIn;
    }
}

export default new Auth();