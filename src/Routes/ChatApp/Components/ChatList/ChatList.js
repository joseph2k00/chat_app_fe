import { useEffect, useState } from "react";
import Users from "../../../../dataset/users.json";

export const ChatList = () => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const chats = Users.user_conversations;
        setChatList(chats);
    }, []);

    return (
        <>
            { 
                chatList.map((data, index) => (
                    <div>
                        <b>{ data.conversation_name }</b>
                        <p>
                            { 
                                data.conversation_type === "GROUP" ? 
                                    (data.last_message.last_message_username + ": ") :
                                    ''
                            } { data.last_message.message }
                        </p>
                    </div>
                ))
            }
        </>
    );
};