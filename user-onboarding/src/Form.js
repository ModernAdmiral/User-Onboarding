import React, { useState, useEffect } from 'react';
import { withFormik, Form,  Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const UserForm = ({ values, touched, errors, status}) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        status && setUser(user => [...user, status])
      },[status])
   return (

    <div>
        <Form>
            <div>
                <Field type="text" name="name" placeholder="Name"/>
                { touched.name && errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <Field type="email" name="email" placeholder="Email"/>
                { touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            
            <div>
                <Field type="password" name="password" placeholder="Password" />
                { touched.password && errors.password && <p>{errors.password}</p>}
            </div>
            
            <div>
                <label>Accepted Terms and Conditions:  <Field type="checkbox" name="tos" checked={values.tos}/></label>
                { touched.tos && errors.tos && <p>{errors.tos}</p>}
            </div>
            <button type="submit">Submit</button>
        </Form>
        <div>
            {user.map(user => (
            <ul key={user.id}>
                <li>Species: {user.name}</li>
                <li>Size: {user.email}</li>
                <li>Diet: {user.password}</li>
            </ul>
            ))}
        </div>
    </div>

    
   )
}

const FormikUserForm = withFormik({
    mapPropsToVales({ name, email, password, tos}){
        return {
            name: name || "test",
            email: email || "",
            password: password || "",
            tos: tos || false
    }
    
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email("Sorry, this is not a valid email").required("Please make sure you add an email so we can spam you"),
        password: Yup.string().min(6, "Please make sure Password is 6 characters or longer").required(),
        name: Yup.string().required("Please make sure you put in your name"),
        
    }),
    handleSubmit(values, {setStatus}) { 
        axios.post('https://reqres.in/api/users/', values) 
              .then(res => {  
                (setStatus(res.data)); 
                }) 
              .catch(err => console.log(err.response));
        }

})(UserForm);

export default FormikUserForm