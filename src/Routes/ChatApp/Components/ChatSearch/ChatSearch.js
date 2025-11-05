import { useEffect, useState } from "react";
import { API_URLS } from "../../../../ApiRoutes/APIRoutes";

export const ChatSearch = () => {

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
            setSearchResults(data);
        }

        initiateSearch();
    }, [searchText]);

    return (
        <>
            <h3>Search User</h3>
            <input type="text" onChange={(e) => setSearchText(e.target.value)} />

            {searchResults?.data && searchResults.data.map((element, index) => (
                <div key={index}>
                    {element.name}
                </div>
            ))}
        </>
    );
};