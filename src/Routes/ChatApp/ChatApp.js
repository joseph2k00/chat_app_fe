import { ActiveChat } from "./Components/ActiveChat/ActiveChat";
import { ChatList } from "./Components/ChatList/ChatList";
import { ChatSearch } from "./Components/ChatSearch/ChatSearch";
import { useState } from "react";

function ChatApp() {
    const [currentCoversationId, setCurrentConversationId] = useState(null);
    const [tempChatUser, setTempChatUser] = useState(null);

    const handleChatSelect = (conversationId) => {
        setTempChatUser(null);
        setCurrentConversationId(conversationId);
    };

    const handleTempChatSelect = (userDetails) => {
        setCurrentConversationId(null);
        setTempChatUser(userDetails);
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
                    {
                        tempChatUser === null && currentCoversationId === null ?
                            (
                                <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50">
                                    <p className="text-lg font-medium">Please select a chat</p>
                                </div>
                            ):
                            <ActiveChat
                                activeChatID={currentCoversationId}
                                tempChatUser={tempChatUser}
                                handleChatSelect={handleChatSelect}/>
                    }
                </div>
            </div>

        </ >
    );
}

export default ChatApp;