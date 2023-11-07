import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function createAccount () {
        try {  
            if(password != confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    }

    

    return (
        <>
        <h1>Create An Account</h1>
        {error && <p className="error">{error}</p>}
        <input 
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
         />
         <input
            type="password"
            placeholder="reenter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
         />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login">Already have an account? Login here.</Link>
        </>
    )
} 

export default CreateAccountPage;