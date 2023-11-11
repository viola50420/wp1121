"use client";

import React from "react";
import Image from "next/image";
import search from "@/assets/search.png";

type SearchBarProps = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setSearch }: SearchBarProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="flex justify-center mt-4 mb-2">
            <input
                className="border border-solid border-1 rounded-md p-2"
                placeholder="尋找活動"
                onChange={handleInputChange}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSearch(searchInput)}
            >
                搜尋
            </button>
        </div>
    );
}