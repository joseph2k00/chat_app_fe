import { useEffect, useState } from "react";
import { API_URLS } from "../../../../ApiRoutes/APIRoutes";

export const ChatList = ({ handleChatSelect }) => {
    const [chatList, setChatList] = useState([]);

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

    return (
        <>
            { 
                chatList.map((data, index) => (
                    <div key={data.id} onClick={ () => { handleChatSelect(data.id) } }>
                        <b>{ data.conversation_title }</b>
                        <p> 
                            <b>{data.latest_message.sender.name}</b>:
                            { 
                                data.conversation_type === "GROUP" ? 
                                    (data.last_message.last_message_username + ": ") :
                                    ''
                            } { data.latest_message.message }
                        </p>
                    </div>
                ))
            }
        </>
    );
};