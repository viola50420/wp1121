"use client";

import { useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import GrowingTextarea from "@/components/GrowingTextarea";


import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";
import { getAvatar } from "@/lib/utils";
import { eq, desc, sql, and } from "drizzle-orm";
import NameDialog from "./NameDialog";
import "react-datepicker/dist/react-datepicker.css";

export default function HomePageTop() {
  const { username, handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();
  const [searchedTweets, setSearchedTweets] = useState([]);

  
  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;

    try {
      await postTweet({
        handle,
        content,
        startDate,
        endDate,
      });
      textareaRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState(new Date());

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
	const keywordInputRef = useRef<HTMLInputElement>(null);

  const handleAddActivityClick = () => {

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

	const handlesearch = () => {
    var keyword = keywordInputRef.current?.value;   
		if(!keyword){
			keyword = "";
  
		}

    const params = new URLSearchParams(searchParams);
    params.set("keyword", keyword!);
    router.push(`${pathname}?${params.toString()}`);
    const searchedTweets = searchTweets(keyword);
    setSearchedTweets(searchedTweets);
    console.log(searchedTweets);
    return true;
   //還沒好

  };

  return (
<div className="flex flex-col items-center mt-4">
  <div className="flex items-center mb-2 justify-center">
    <p className="font-bold">{username}</p>
    <button 
    className="bg-blue-500 text-white p-2 rounded ml-2"
    onClick={() => router.push('/')}
    >切換使用者</button>
   
  </div>
  <div className="flex items-center mb-2 justify-center">
    <input
      type="text"
      placeholder="搜尋活動"
      className="mr-2 p-2 border border-gray-300 rounded"
      // defaultValue={""}
			ref={keywordInputRef}
    />
      <button
      onClick={handlesearch}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      搜尋活動
    </button>
    <button
      onClick={handleAddActivityClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      新增活動
    </button>
  </div>
 
    {showModal && (
     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">          <div className="modal bg-white p-6 rounded shadow-lg">
           
           <span
             className="close absolute top-2 right-2 cursor-pointer text-3xl"
              onClick={handleCloseModal}>
                 &times;
            </span>
            <h2 className="text-2xl mb-4">新增活動</h2>
            <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="What's happening?"
          />
        <div className="mb-2 mt-6">
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy hh:00"
      />  
       <h2 className="text-2xl mb-4">~</h2>

        <DatePicker
        selected={endDate}
        onChange={(date) => setEndtDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy hh:00"
      /> 
        
        </div>  
        <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={handleTweet}
            disabled={loading}
          >
            Post
          </button>
        </div>
     
        </div>
      )}

  </div>
    
  );
}

