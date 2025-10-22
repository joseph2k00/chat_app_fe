import './App.css';
import ChatApp from "./Routes/ChatApp/ChatApp";
import Login from "./Routes/Login/Login";
import Signup from "./Routes/Signup/Signup";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { AuthContext, AuthenticatedRoute, PublicRoute } from './Context/AuthContext';
import { useContext } from 'react';

function App() {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <nav>
        {!user && <Link to="/login"> Login</Link>}
        {!user && <Link to="/signup"> Signup</Link>}
        {user && <Link to="/"> Home</Link>}
        {user && <button onClick={handleLogout}> Logout</button>}
      </nav>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/" element={<AuthenticatedRoute><ChatApp /></AuthenticatedRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
