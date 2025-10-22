import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatList } from "./Components/ChatList/ChatList";

function ChatApp() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome to the Chat Application, {user.username}!</h1>
            <div>
                <ChatList />
            </div>
        </div>
    );
}

export default ChatApp;