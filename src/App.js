import './App.css';
import ChatApp from "./Routes/ChatApp/ChatApp";
import Login from "./Routes/Login/Login";
import Signup from "./Routes/Signup/Signup";
import Users from "./dataset/users.json";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { useState } from "react";

console.log(Users);
function App() {
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

  return (
    <>
      <BrowserRouter>
        <nav>
          {!user && <Link to="/login"> Login</Link>}
          {!user && <Link to="/signup"> Signup</Link>}
          {user && <Link to="/"> Home</Link>}
        </nav>
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
