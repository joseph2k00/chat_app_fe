import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [screenError, setScreenError] = useState(null);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email: email, password: password };
        
        const response = await handleLogin(userData);

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
                <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
                { screenError }
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={ (e) => setEmail(e.target.value) } required />
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

export default Login;