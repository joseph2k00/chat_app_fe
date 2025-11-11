import { API_URLS } from "../../../../ApiRoutes/APIRoutes";
import { AuthContext } from "../../../../Context/AuthContext";
import { echo } from "./../../../../realtime/Echo";
import { useContext, useEffect, useState } from "react";

export const ChatList = ({ handleChatSelect }) => {
    const [chatList, setChatList] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const loadChats = async () => {
            const response = await fetch(
                process.env.REACT_APP_API_URL + API_URLS.GET_CONVERSATIONS,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("user_token")
                    }
                }
            );

            const data = await response.json();
            setChatList(data);
        }

        loadChats();
    }, []);
    
    useEffect(() => {
        const channel = echo.private(`new.conversation.received.${user.id}`);
        channel.listen('.new.conversation.received', (e) => {
            setChatList(prev => {
                const exists = prev.some(chat => chat.id === e.conversationId);

                if (exists) {
                    return prev.map(chat =>
                        chat.id === e.conversationId
                            ? {
                                ...chat,
                                conversation_title: e.conversationTitle,
                                latest_message: {
                                    message: e.messageContent,
                                    sender: { name: e.senderName }
                                }
                            }
                            : chat
                    );
                }

                return [
                    {
                        id: e.conversationId,
                        conversation_title: e.conversationTitle,
                        latest_message: {
                            message: e.messageContent,
                            sender: { name: e.senderName }
                        }
                    },
                    ...prev
                ];
            });
        });

        return () => {
            echo.leave(`new.conversation.received.${user.id}`);
        };
    }, [user.id]);

    return (
        <>
            <div className="bg-white shadow-md rounded-2xl p-4 max-w-md mx-auto mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Chats</h3>

                <div className="space-y-3">
                {chatList.length > 0 ? (
                    chatList.map((data) => (
                    <div
                        key={data.id}
                        onClick={() => handleChatSelect(data.id)}
                        className="cursor-pointer p-3 rounded-xl border border-gray-200 hover:bg-blue-50 transition duration-200"
                    >
                        <b className="text-gray-800 block">{data.conversation_title}</b>
                        <p className="text-gray-600 text-sm truncate">
                        <span className="font-medium text-gray-700">{data.latest_message.sender.name}</span>:{" "}
                        {data.latest_message.message}
                        </p>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center">No chats available</p>
                )}
                </div>
            </div>
        </>
    );
};