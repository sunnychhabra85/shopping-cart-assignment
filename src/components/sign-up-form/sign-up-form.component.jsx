import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);
    const handleChange =(event)=>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})
    }

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password != confirmPassword){
            alert("Passord do not match!");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);

            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        }
        catch(error){
            if(error.code == 'auth/email-already-in-use'){
                alert("Cannot create user, email already in use!");
            }
            console.log("User creation encounteres an error!", error);
        }

    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName} />
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
                <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} />
                {/* <label>Display Name</label>
                <input type="text" name="displayName" required onChange={handleChange} value={displayName}/>
                <label>Email</label>
                <input type="email" name="email" required onChange={handleChange} value={email}/>
                <label>Password</label>
                <input type="password" name="password" required onChange={handleChange} value={password}/>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/> */}
                <Button type="submit">Sign Up</Button>
            </form>
       </div>
    )
}

export default SignUpForm;