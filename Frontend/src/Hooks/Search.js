import { useState, useEffect } from "react";

const useSearch = (initialItems, apiUrl) => {
    const [items, setItems] = useState(initialItems);
    const [filteredItems, setFilteredItems] = useState(initialItems);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setFilteredItems(data);
            })
            .catch((error) => console.error("Error fetching items:", error));
    }, [apiUrl]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm === "") {
            setFilteredItems(items);
        } else {
            const filtered = items.filter((item) =>
                item.Item_Name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(filtered);
        }
        setIsEmpty(filteredItems.length === 0 && searchTerm !== "");
    };

    return { filteredItems, searchTerm, setSearchTerm, handleSearch, isEmpty };
};

export default useSearch;
