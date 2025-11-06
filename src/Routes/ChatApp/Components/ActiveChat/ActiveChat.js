import { useEffect, useState } from "react";
import { API_URLS } from "../../../../ApiRoutes/APIRoutes";
import { echo } from "./../../../../realtime/Echo"; 

export const ActiveChat = ({ activeChatID, tempChatUserId }) => {
    const [chat, setChat] = useState(null);
    const [chatTextBox, setChatTextBox] = useState("");

    useEffect(() => {
        const loadChat = async () => {
            if (activeChatID !== null)
            {
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
                console.log(data);
            }
        }

        loadChat();
    }, [activeChatID]);

    useEffect(() => {
        console.log(1);
        const channel = echo.private('test.ws');
        channel.listen('.test.done', (e) => {
            console.log('Payload:', e);
        });
        return () => {
            echo.leave('private-test.ws');
        };
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            await fetch(
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
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setChatTextBox(e.target.value) }></input>
                <button type="submit">Send</button>
            </form>
        </>
    ): tempChatUserId ? (
        <>
            <h3>New Chat with Someone</h3>
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