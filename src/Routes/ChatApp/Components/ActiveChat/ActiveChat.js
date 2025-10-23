import { useEffect, useState } from "react";
import Users from "../../../../dataset/users.json";

export const ActiveChat = ({ activeChatID }) => {
    const [chat, setChat] = useState(null);

    useEffect(() => {
        const conversation = activeChatID ?
            Users.user_conversations.find((chat) => chat.conversation_id === activeChatID):
            null;
        setChat(conversation);
    }, [activeChatID]);

    if (!activeChatID) {
        return <p>Please select a chat</p>;
    }

    if (!chat) {
        return <p>Loading chat...</p>;
    }

    return activeChatID ? (
        <>
            <h3>{chat.conversation_name ?? "Chat"}</h3>
            <ul>
                {chat.messages.map((msg, index) => (
                    <li key={index}>
                        <b>{ msg.user.username }</ b>: { msg.message }
                    </li>
                ))}
            </ul>
        </>
    ): 
    (
        <>
            Please select a chat
        </>
    );
};