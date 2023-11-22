"use client";

import { useDocument } from "@/hooks/useDocument";
import { Input} from "@/components/ui/input"
import { Button} from "@/components/ui/button"

function DocPage() {
  const { title, setTitle, content, setContent, Message, setMessage,  saveMessage } = useDocument();
 
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleButtonClick = () => {
    //送出訊息
    saveMessage();
    console.log(Message);
    };

 
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
        <textarea
          value={content || ""}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="h-[80vh] w-full outline-0 "
        />
      </section>
      <div className="flex space-x-4">
      <Input value={title} onChange={handleInputChange} />
        <Button onClick={ handleButtonClick}>Send</Button>
      </div>
    </div>
  );
}

export default DocPage;
