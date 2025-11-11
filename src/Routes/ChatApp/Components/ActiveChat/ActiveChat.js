import { useEffect, useState } from "react";
import { API_URLS } from "../../../../ApiRoutes/APIRoutes";
import { echo } from "./../../../../realtime/Echo";
import { LoadingScreen } from "../../../../Common/Components/LoadingScreen";

const loadChat = async (activeChatID, setChat) => {
    if (activeChatID !== null) {
        const response = await fetch(
            process.env.REACT_APP_API_URL + API_URLS.GET_CONVERSATION_DETAILS + activeChatID,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("user_token")
                }
            }
        );

        const data = await response.json();
        setChat(data);
    } else {
        setChat(null);
    }
}

export const ActiveChat = ({ activeChatID, tempChatUserId, handleChatSelect }) => {
    const [chat, setChat] = useState(null);
    const [chatTextBox, setChatTextBox] = useState("");
    const [langTextBox, setLangTextBox] = useState("");
    
    useEffect(() => {
        loadChat(activeChatID, setChat);
        if (activeChatID) {
            const channel = echo.private(`message.received.${activeChatID}`);
            channel.listen('.message.received', (e) => {
                loadChat(activeChatID, setChat);
            });
            return () => {
                echo.leave(`private-message.received.${activeChatID}`);
            };
        }
    }, [activeChatID]);

    const handleTranslate = async (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        const apiBody = {
            message_id: e.target[0].value,
            target_language: langTextBox,
        };

        const res = await fetch(
            process.env.REACT_APP_API_URL + API_URLS.TRANSLATE_MESSAGE,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("user_token")
                },
                body: JSON.stringify(apiBody)
            }
        );
        const data = await res.json();
        console.log(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setChatTextBox('');
        const newMessage = {message: chatTextBox};

        if (!tempChatUserId) {
            newMessage.conversation_id = activeChatID;
            await fetch(
                process.env.REACT_APP_API_URL + API_URLS.SEND_MESSAGE,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("user_token")
                    },
                    body: JSON.stringify(newMessage)
                }
            );
        } else {
            newMessage.other_user_id = tempChatUserId;
            const res = await fetch(
                process.env.REACT_APP_API_URL + API_URLS.CREATE_CONVERSATION,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("user_token")
                    },
                    body: JSON.stringify(newMessage)
                }
            );
            const data = await res.json();
            handleChatSelect(data.conversation_id);
        }
    };

    if (!activeChatID && !tempChatUserId) {
        return (            
            <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50">
                <p className="text-lg font-medium">Please select a chat</p>
            </div>
        );
    }

    if (!chat && !tempChatUserId) {
        return (
            <LoadingScreen text="Loading Chat..." /> 
        )
    }

    return activeChatID ? (
            <>
                <div className="flex flex-col h-full max-w-2xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden mt-6">
                    {/* Chat Header */}
                    <div className="bg-blue-600 text-white px-4 py-3 text-lg font-semibold">
                        {chat.conversation_title ?? "Chat"}
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {chat.messages.map((msg, index) => (
                        <div
                            key={index}
                            className="bg-white p-3 rounded-xl shadow-sm border border-gray-200"
                        >
                            <p className="text-gray-800">
                            <b className="text-blue-600">{msg.username}</b>: {msg.message}
                            </p>

                            {/* Translate form */}
                            <form
                            onSubmit={handleTranslate}
                            className="mt-2 flex items-center space-x-2"
                            >
                            <input type="number" value={msg.id} hidden />
                            <input
                                type="text"
                                placeholder="Enter language code (e.g. fr)"
                                onChange={(e) => setLangTextBox(e.target.value)}
                                value={langTextBox}
                                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Translate
                            </button>
                            </form>
                        </div>
                        ))}
                    </div>

                    {/* Send Message Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center border-t border-gray-200 p-3 bg-white"
                    >
                        <input
                        type="text"
                        placeholder="Type your message..."
                        onChange={(e) => setChatTextBox(e.target.value)}
                        value={chatTextBox}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                        type="submit"
                        className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                        Send
                        </button>
                    </form>
                </div>
            </>
        ) : tempChatUserId ? (
            <>
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">New Chat</h3>
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <input
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => setChatTextBox(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                    Send
                    </button>
                </form>
                </div>
            </>
        ) : (
            <div className="text-center text-gray-500 mt-10">
                Please select a chat
            </div>
        );

};