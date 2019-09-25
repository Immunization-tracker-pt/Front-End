import React, {useState, useEffect} from 'react';

import * as yup from 'yup';
import axios from 'axios';

let parents = [{
    "id": 1,
    "username": "testfamily",
    "email": "test@test.com",
    "password": "test",
    "firstname": "Jack",
    "middlename": "Alex",
    "lastname": "Smith",
    "dob": "1980-09-19T21:01:23.369Z",
    "gender": "male",
    "street": "125 Address Way",
    "street2": null,
    "city": "A Big City",
    "state_province": "California",
    "phonenumber": "555-555-1234"
  }];

let children = [{
    
        "id": 1,
        "parent_id": 1,
        "fullname": "Bobby Smith",
        "dob": "2019-05-19T21:01:23.369Z"
      
},
{
    
    "id": 2,
    "parent_id": 1,
    "fullname": "Jane Smith",
    "dob": "2019-05-19T21:01:23.369Z"
  
}
]; 

let immunizations = [{
    "id": 1,
    "child_id": 1,
    "doctor_id": 1,
    "name": "Measels Vaccine",
    "date_administered": "2019-09-19T21:01:23.369Z",
    "location": "Right arm"
},
{
    "id": 2,
    "child_id": 2,
    "doctor_id": 1,
    "name": "Rubella",
    "date_administered": null,
    "location": null
},

]; 

let doctors =[{
    "id": 1,
    "name": "Test Doctors Office",
    "username": "testdoctor",
    "email": "doctortest@test.com",
    "password": "test"
}]; 

let parent_doctor_detail = [{
    "id": 1,
    "doctor_id": 2,
    "parent_id": 1,
    "permission_requested": 1,        // Boolean. 1 = TRUE, 0 = FALSE. Defaults to 0
    "permission_granted": 1           // Boolean. 1 = TRUE, 0 = FALSE. Defaults to 0
}]; 

let UserHomePage = (props) => {
    return (
        <table>
            <tr>
                <th>Child Name</th>
                <th>Doctor Name</th>
                <th>Immunizations Name</th>
                <th>Date Received</th>
                <th>Location</th>
            </tr>
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
        
        </table>
    )
}

  export default UserHomePage; 