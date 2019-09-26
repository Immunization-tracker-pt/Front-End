import React from 'react';

const getJSON = (key, subData) => {
    const data = JSON.parse(sessionStorage.getItem(key));
    return subData ? data[subData] : data;
}


function UserLanding(props){
    return(
        <div>
            <h1>{getJSON('message')}</h1>
        </div>
    )
}

export default UserLanding;