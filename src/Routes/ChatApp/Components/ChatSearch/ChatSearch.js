import { useEffect, useState } from "react";
import { API_URLS } from "../../../../ApiRoutes/APIRoutes";

export const ChatSearch = ({ handleTempChatSelect }) => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchText === '') {
            setSearchResults([]);
            return;
        }

        const initiateSearch = async () => {
            const response = await fetch(
                process.env.REACT_APP_API_URL + API_URLS.SEARCH_USER + "?query=" + encodeURIComponent(searchText),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("user_token")
                    }
                }
            );

            const data = await response.json();
            console.log(data);
            setSearchResults(data);
        }

        initiateSearch();
    }, [searchText]);


    const handleStartChat = (userId) => {
        handleTempChatSelect(userId);
    }

    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Search User</h3>

                <input
                type="text"
                placeholder="Type a name..."
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <div className="space-y-2">
                {searchResults?.data && searchResults.data.length > 0 ? (
                    searchResults.data.map((element, index) => (
                    <div
                        key={index}
                        onClick={() => handleStartChat(element.id)}
                        className="cursor-pointer px-4 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition duration-200"
                    >
                        <p className="text-gray-700 font-medium">{element.name}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center">No users found</p>
                )}
                </div>
            </div>
        </>
    );
};