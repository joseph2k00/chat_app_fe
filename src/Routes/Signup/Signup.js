import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../../Common/Components/LoadingButton";

function Signup() {
    const { handleSignup } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [screenError, setScreenError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        setIsLoading(true);
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
            setIsLoading(false);
            setScreenError(response.message ? "An error has occured" : null);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Signup</h2>
                <form onSubmit={handleSubmit}>
                    { screenError }
                    <div>
                        <label 
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1">
                                Email:
                        </label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            onChange={ (e) => setEmail(e.target.value) } 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required />
                    </div>
                    <div>
                        <label 
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1">
                                Username:
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            onChange={ (e) => setUsername(e.target.value) } 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1">
                                Password:
                        </label>
                        <input 
                            type="text" 
                            id="password" 
                            name="password" 
                            onChange={ (e) => setPassword(e.target.value) }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required />
                    </div>
                    
                    <div>
                        <LoadingButton buttonText={ isLoading ? "Signing up..." : "Signin" } isLoading={ isLoading } />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;