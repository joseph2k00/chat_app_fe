function Signup() {
    return (
        <>
            <div>
                <h2>Login</h2>
            </div>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <button type="submit">Signup</button>
                </div>
            </form>
        </>
    );
};

export default Signup;