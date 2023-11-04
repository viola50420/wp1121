import Link from "next/link";

import { MessageCircle, Repeat2, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getAvatar } from "@/lib/utils";

import LikeButton from "./LikeButton";
import TimeText from "./TimeText";

type TweetProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
  likes: number;
  createdAt: Date;
  liked?: boolean;
  startDate: Date;
  endDate: Date;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Reply({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  content,
  likes,
  createdAt,
  liked,
  startDate,
  endDate,
}: TweetProps) {
  return (
    <>
    <div className="container mx-auto">

    <div className="bg-white rounded-lg p-4 mb-4 shadow-md max-w-3xl mx-auto">

      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
        <div className="flex-grow">

          <article className="flex grow flex-col">
           
            {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
            <article className="whitespace-pre-wrap text-center">{content}</article>
           
          </article>
          </div>
      
        </div>
      </Link>
      </div>
      </div>


    </>
  );
}
