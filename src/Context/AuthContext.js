import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URLS } from "../ApiRoutes/APIRoutes";
import { echo } from "../realtime/Echo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const getCurrentUserProfile = async () => {
        if (localStorage.getItem('user_token'))
        {
            const response = await fetch(
                process.env.REACT_APP_API_URL + API_URLS.PROFILE,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("user_token")
                    }
                }
            );

            const profileData = await response.json();

            return {
                id: profileData.id,
                username: profileData.name,
                email: profileData.email
            }
        }
        return null;
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const profile = await getCurrentUserProfile();
            setUser(profile);
        };
        loadUser();
    }, []);

    const handleLogin = async (userData) => {
        const res = await fetch(
            process.env.REACT_APP_API_URL + API_URLS.LOGIN,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                })
            }
        );

        const data = await res.json();

        if (!res.ok || data.status === "error") {
            return {
                status: false,
                message: "Something went wrong"
            };
        }

        localStorage.setItem("user_token", data.token);
        echo.options.auth.headers.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
        const currentUser = await getCurrentUserProfile();
        setUser(currentUser);

        return {
            status: true
        }
    };

    const handleSignup = async (userData) => {
            try {
                const res = await fetch(
                    process.env.REACT_APP_API_URL + API_URLS.REGISTER,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: userData.email,
                            password: userData.password,
                            name: userData.username,
                        })
                    }
                );

                const data = await res.json();

                if (!res.ok || data.status === "error") {
                    return {
                        status: false,
                        message: "Something went wrong"
                    };
                }

                localStorage.setItem("user_token", data.token);
                echo.options.auth.headers.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
                
                const currentUser = await getCurrentUserProfile();
                setUser(currentUser);

                return {
                    status: true
                }
            } catch (error) {
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }
    };

    const handleLogout = async () => {
        await fetch(
            process.env.REACT_APP_API_URL + API_URLS.LOGOUT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("user_token")
                }
            }
        );
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthenticatedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user ? 
        (children) :
        (<Navigate to="/login" />)
};

export const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return !user ? 
        (children) :
        (<Navigate to="/" />)
};