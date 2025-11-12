import { ActiveChat } from "./Components/ActiveChat/ActiveChat";
import { ChatList } from "./Components/ChatList/ChatList";
import { ChatSearch } from "./Components/ChatSearch/ChatSearch";
import { useState } from "react";

function ChatApp() {
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
            <div className="flex h-19/20 bg-gray-100">
                {/* Left Sidebar */}
                <div className="w-1/3 max-w-sm bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                    <ChatSearch handleTempChatSelect={handleTempChatSelect} />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                    <ChatList handleChatSelect={handleChatSelect} />
                    </div>
                </div>

                {/* Right Chat Area */}
                <div className="flex-1 bg-white">
                    <ActiveChat
                    activeChatID={currentCoversationId}
                    tempChatUserId={tempChatUserId}
                    handleChatSelect={handleChatSelect}
                    />
                </div>
            </div>

        </ >
    );
}

export default ChatApp;