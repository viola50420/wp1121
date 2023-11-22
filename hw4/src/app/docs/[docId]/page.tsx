"use client";

import Messages from "../_components/Message";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDocument } from "@/hooks/useDocument";

function DocPage() {
  const {
    title,
    setTitle,
    content,
    messages,
    Message,
    setMessage,
    saveMessage,
    chatMessages,
  } = useDocument();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleButtonClick = () => {
    //送出訊息
    saveMessage();
    // console.log(Message);
  };
  console.log(chatMessages);

  return (
    <div className="w-full">
      <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Document Title"
          className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100"
        />
      </nav>
      <section className="w-full px-4 py-4">
        {/* 渲染所有消息 */}
        {chatMessages?.map((msg, index) => (
          <div>
            {/* 根据需要在此处呈现消息的内容 */}
            {msg?.content}
          </div>
        ))}
      </section>

      <div className="flex space-x-4">
        <Input value={Message} onChange={handleInputChange} />
        <Button onClick={handleButtonClick}>Send</Button>
      </div>
    </div>
  );
}

export default DocPage;
