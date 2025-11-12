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
      <nav className="bg-white text-black px-6 py-3 flex items-center justify-between shadow-md h-1/20">
        <h1 className="text-lg font-semibold">MyApp</h1>
        <div className="flex items-center space-x-4">
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-blue-200 transition duration-200"
              >
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/"
                className="hover:text-blue-200 transition duration-200"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <ChatApp />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
