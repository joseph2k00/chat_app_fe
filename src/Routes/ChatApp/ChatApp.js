import { ActiveChat } from "./Components/ActiveChat/ActiveChat";
import { AuthContext } from "../../Context/AuthContext";
import { ChatList } from "./Components/ChatList/ChatList";
import { ChatSearch } from "./Components/ChatSearch/ChatSearch";
import { useContext, useState } from "react";

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
                <ChatSearch />
                <hr />
                <ChatList handleChatSelect={handleChatSelect} />
                <hr />
                <ActiveChat activeChatID={currentCoversationId} />
            </div>
        </ >
    );
}

export default ChatApp;