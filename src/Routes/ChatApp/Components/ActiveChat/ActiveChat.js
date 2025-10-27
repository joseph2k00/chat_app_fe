import { useEffect, useState } from "react";
import Users from "../../../../dataset/users.json";

export const ActiveChat = ({ activeChatID }) => {
    const [chat, setChat] = useState(null);
    const [chatTextBox, setChatTextBox] = useState("");

    useEffect(() => {
        const conversation = activeChatID ?
            Users.user_conversations.find((chat) => chat.conversation_id === activeChatID):
            null;
        setChat(conversation);
    }, [activeChatID]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            message_id: 5,
            message_type: "OUTBOUND",
            user: { username: "You", user_id: 101 },
            is_reply: false,
            reply_message_id: null,
            message: chatTextBox
        };

        setChat(prev => ({
            ...prev,
            messages: [...prev.messages, newMessage],
            last_message: {
                "last_message_username": "You",
                "message_type": "OUTBOUND",
                "message": chatTextBox
            }
        }));
    };

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
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setChatTextBox(e.target.value) }></input>
                <button type="submit">Send</button>
            </form>
        </>
    ): 
    (
        <>
            Please select a chat
        </>
    );
};