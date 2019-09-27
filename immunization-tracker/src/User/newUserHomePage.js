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
            <table>
            <thead>
            <tr>
                <th>Child Name</th>
                <th>Doctor Name</th>
                <th>Immunizations Name</th>
                <th>Date Received</th>
                <th>Location</th>
            </tr>
            </thead> 

            <tbody>
            {immunizations.map(i => 
                <tr> 
                    <td>
                        {children.filter(c => c.id == i.child_id)[0].fullname}
                    </td>
                    <td>
                        {doctors.filter (d => d.id == i.doctor_id)[0].name}
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