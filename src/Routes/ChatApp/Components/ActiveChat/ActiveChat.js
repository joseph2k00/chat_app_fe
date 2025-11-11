import { useEffect, useState } from "react";
import { API_URLS } from "../../../../ApiRoutes/APIRoutes";
import { echo } from "./../../../../realtime/Echo";

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
        return <p>Please select a chat</p>;
    }

    if (!chat && !tempChatUserId) {
        return <p>Loading chat...</p>;
    }

    return activeChatID ? (
        <>
            <h3>{chat.conversation_title ?? "Chat"}</h3>
            <ul>
                {chat.messages.map((msg, index) => (
                    <li key={index}>
                        <b>{ msg.username }</ b>: { msg.message }
                        <form onSubmit={handleTranslate}>
                            <input type="number" value={msg.id} hidden></input>
                            <input type="text" onChange={ (e) => setLangTextBox(e.target.value) } value={langTextBox}></input>
                            <button type="submit">Translate</button>
                        </form>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setChatTextBox(e.target.value) } value={chatTextBox}></input>
                <button type="submit">Send</button>
            </form>
        </>
    ): tempChatUserId ? (
        <>
            <h3>New Chat</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setChatTextBox(e.target.value) }></input>
                <button type="submit">Send</button>
            </form>
        </>
    ) :
    (
        <>
            Please select a chat
        </>
    );
};