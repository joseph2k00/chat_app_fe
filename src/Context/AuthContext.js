import { createContext, useState } from "react";
import Users from "../dataset/users.json";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogin = (userData) => {
        if (Users.users.find((user) => user.username === userData.username && user.password === userData.password)) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        } else {
        alert("Invalid username or password");
        }
    };

    const handleSignup = (userData) => {
        if (Users.users.find((user) => user.username === userData.username)) {      
        alert("Username already exists");
        } else {
        userData.id = userData.token = Users.users[Users.users.length - 1].id + 1;
        Users.users.push(userData);
        alert("User registered successfully. Please login.");
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};