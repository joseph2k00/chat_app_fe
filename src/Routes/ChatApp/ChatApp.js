import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function ChatApp() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome to the Chat Application, {user.username}!</h1>
        </div>
    );
}

export default ChatApp;