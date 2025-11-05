import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
    const { handleSignup } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [screenError, setScreenError] = useState(null);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { 
            username: username,
            email: email,
            password: password
        };
        const response = handleSignup(userData);

        if (response.status)
        {
            navigate('/');
        }
        else
        {
            setScreenError(response.message ? "An error has occured" : null);
        }
    }

    return (
        <>
            <div>
                <h2>Signup</h2>
            </div>
            <form onSubmit={handleSubmit}>
                { screenError }
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={ (e) => setEmail(e.target.value) } required />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={ (e) => setUsername(e.target.value) } required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" name="password" onChange={ (e) => setPassword(e.target.value) } required />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    );
};

export default Signup;