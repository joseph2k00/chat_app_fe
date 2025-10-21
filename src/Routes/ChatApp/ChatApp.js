import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function ChatApp() {
    const { user } = useContext(AuthContext);

    return user ? (
        <div>
            <h1>Welcome to the Chat Application, {user.username}!</h1>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
}

export default ChatApp;