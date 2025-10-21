import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

function Signup() {
    const { handleSignup } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { username: username, password: password };
        handleSignup(userData);
    }

    return (
        <>
            <div>
                <h2>Signup</h2>
            </div>
            <form onSubmit={handleSubmit}>
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