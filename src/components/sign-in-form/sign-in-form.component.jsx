import { useState, useContext } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
// import { UserContext } from "../../context/user.context";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    // const {setCurrentUser} = useContext(UserContext);

    // console.log(formFields);
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        // const { user } = await signInWithGooglePopup();
        // setCurrentUser(user);
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            resetFormFields();
        }
        catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect password for email!")
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email!")
                    break;
                default:
                    console.log(error)
            }
            if(error.code =="auth/wrong-password"){
                alert("Incorrect password for email");
            }
        }

    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
                {/* <label>Display Name</label>
                <input type="text" name="displayName" required onChange={handleChange} value={displayName}/>
                <label>Email</label>
                <input type="email" name="email" required onChange={handleChange} value={email}/>
                <label>Password</label>
                <input type="password" name="password" required onChange={handleChange} value={password}/>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/> */}
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;