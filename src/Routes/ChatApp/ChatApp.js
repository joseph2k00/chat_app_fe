import { ActiveChat } from "./Components/ActiveChat/ActiveChat";
import { AuthContext } from "../../Context/AuthContext";
import { ChatList } from "./Components/ChatList/ChatList";
import { ChatSearch } from "./Components/ChatSearch/ChatSearch";
import { useContext, useState } from "react";

function ChatApp() {
    const { user } = useContext(AuthContext);
    const [currentCoversationId, setCurrentConversationId] = useState(null);
    const [tempChatUserId, setTempChatUserId] = useState(null);

    const handleChatSelect = (conversationId) => {
        setTempChatUserId(null);
        setCurrentConversationId(conversationId);
    };

    const handleTempChatSelect = (userId) => {
        setCurrentConversationId(null);
        setTempChatUserId(userId);
    };

    return (
        <>
            <h1>Welcome to the Chat Application, {user.username}!</h1>
            <div>
                <ChatSearch handleTempChatSelect={handleTempChatSelect} />
                <hr />
                <ChatList handleChatSelect={handleChatSelect} />
                <hr />
                <ActiveChat 
                    activeChatID={currentCoversationId}
                    tempChatUserId={tempChatUserId}
                    handleChatSelect={handleChatSelect} />
            </div>
        </ >
    );
}

export default ChatApp;