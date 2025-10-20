import { useState } from "react";

function Login({handleLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { username: username, password: password };
        handleLogin(userData);
    }

    return (
        <>
            <div>
                <h2>Login</h2>
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

export default Login;