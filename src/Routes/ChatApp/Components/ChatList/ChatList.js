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
            { 
                chatList.map((data, index) => (
                    <div key={data.id} onClick={ () => { handleChatSelect(data.id) } }>
                        <b>{ data.conversation_title }</b>
                        <p> 
                            <b>{data.latest_message.sender.name}</b>: { data.latest_message.message }
                        </p>
                    </div>
                ))
            }
        </>
    );
};