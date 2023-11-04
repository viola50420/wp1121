"use client";

import React, { useState } from "react";


type SearchBarProps = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setSearch }: SearchBarProps) {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        setSearch(searchInput);
    }

    return (
        <div className="flex justify-center mt-4 mb-2">
            <input
                className="border border-solid border-1 rounded-md p-2"
                placeholder="尋找活動"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSearch}
            >
                搜尋
            </button>
        </div>
    );
}