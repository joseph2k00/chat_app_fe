import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatList } from "./Components/ChatList/ChatList";
import { ActiveChat } from "./Components/ActiveChat/ActiveChat";

function ChatApp() {
    const { user } = useContext(AuthContext);
    const [currentCoversationId, setCurrentConversationId] = useState(null);

    const handleChatSelect = (conversationId) => {
        setCurrentConversationId(conversationId);
    };

    return (
        <>
            <h1>Welcome to the Chat Application, {user.username}!</h1>
            <div>
                <ChatList handleChatSelect={handleChatSelect} />
                <hr />
                <ActiveChat activeChatID={currentCoversationId} />
            </div>
        </ >
    );
}

export default ChatApp;