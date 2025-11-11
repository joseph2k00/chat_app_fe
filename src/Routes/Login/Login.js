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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {screenError && (
                        <div className="text-red-500 text-sm text-center">{screenError}</div>
                    )}

                    <div>
                        <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Email
                        </label>
                        <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                                Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;