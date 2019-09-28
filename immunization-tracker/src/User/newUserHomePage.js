import React, {useState, useEffect} from 'react';
import axios from 'axios';


const getJSON = (key, subData) => {
    const data = JSON.parse(sessionStorage.getItem(key));
    return subData ? data[subData] : data;
}



function UserLanding(props){

    const [immunizations, setImmunizations] = useState([]); 
    const [doctors, setDoctors] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect (() => {

        axios.get("https://bw4-immunization.herokuapp.com/api/children")
        .then((res) => {
            console.log(res.data); 
           setChildren(res.data); 
        })
        axios.get("https://bw4-immunization.herokuapp.com/api/doctors")
        .then((res) => {
            console.log(res.data); 
           setDoctors(res.data); 
        })
        axios.get("https://bw4-immunization.herokuapp.com/api/immunizations")
        .then((res) => {
            console.log(res.data); 
           setImmunizations(res.data); 
        })
    }, []
    )

    return(
        <div>
            <h1>{getJSON('message')}</h1>
            <table class = 'table'>
            <thead>
            <tr>
                <th scope ='col'>Child Name</th>
                <th scope ='col'>Doctor Name</th>
                <th scope ='col'>Immunizations Name</th>
                <th scope ='col'>Date Received</th>
                <th scope ='col'>Location</th>
            </tr>
            </thead> 

            <tbody>
            {immunizations.map(i => 
                <tr key = {i.id}> 
                    <td>
                        {(() => {
                            let child = children.filter(c => c.id == i.child_id)[0];
                            return child && child.fullname;
                        })()}
                    </td>
                    <td>
                        {(() => {
                            let doctor = doctors.filter (d => d.id == i.doctor_id)[0]; 
                            return doctor && doctor.name; 
                        })()}
                    </td>
                    <td>
                        {i.name}
                    </td>
                    <td>
                        {i.date_administered || "Missing"}
                    </td>
                    <td>
                        {i.location}
                    </td>

                </tr>

            )}
        </tbody>
        </table>
        </div>
    )
}

export default UserLanding;