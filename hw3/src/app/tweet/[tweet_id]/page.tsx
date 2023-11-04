import Link from "next/link";
import { redirect } from "next/navigation";

import { eq, desc, sql, and } from "drizzle-orm";
import {
  ArrowLeft,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
} from "lucide-react";

import LikeButton from "@/components/LikeButton";
import ReplyInput from "@/components/ReplyInput";
import TimeText from "@/components/TimeText";
import Tweet from "@/components/Tweet";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";
import { getAvatar } from "@/lib/utils";
import Reply from "@/components/reply";

type TweetPageProps = {
  params: {
    // this came from the file name: [tweet_id].tsx
    tweet_id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
    handle?: string;
  };
};

// these two fields are always available in the props object of a page component
export default async function TweetPage({
  params: { tweet_id },
  searchParams: { username, handle },
}: TweetPageProps) {
  // this function redirects to the home page when there is an error
  const errorRedirect = () => {
    const params = new URLSearchParams();
    username && params.set("username", username);
    handle && params.set("handle", handle);
    redirect(`/?${params.toString()}`);
  };

  // if the tweet_id can not be turned into a number, redirect to the home page
  const tweet_id_num = parseInt(tweet_id);
  if (isNaN(tweet_id_num)) {
    errorRedirect();
  }

  // This is the easiest way to get the tweet data
  // you can run separate queries for the tweet data, likes, and liked
  // and then combine them in javascript.
  //
  // This gets things done for now, but it's not the best way to do it
  // relational databases are highly optimized for this kind of thing
  // we should always try to do as much as possible in the database.

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //   id,
  //   content,
  //   user_handle,
  //   created_at
  //   FROM tweets
  //   WHERE id = {tweet_id_num};
  const [tweetData] = await db
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      userHandle: tweetsTable.userHandle,
      createdAt: tweetsTable.createdAt,
      startDate: tweetsTable.startDate, 
      endDate: tweetsTable.endDate, 

    })
    .from(tweetsTable)
    .where(eq(tweetsTable.id, tweet_id_num))
    .execute();

  // Although typescript thinks tweetData is not undefined, it is possible
  // that tweetData is undefined. This can happen if the tweet doesn't exist.
  // Thus the destructuring assignment above is not safe. We need to check
  // if tweetData is undefined before using it.
  if (!tweetData) {
    errorRedirect();
  }

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //  id,
  //  FROM likes
  //  WHERE tweet_id = {tweet_id_num};
  // Since we only need the number of likes, we don't actually need to select
  // the id here, we can select a constant 1 instead. Or even better, we can
  // use the count aggregate function to count the number of rows in the table.
  // This is what we do in the next code block in likesSubquery.
  const likes = await db
    .select({
      id: likesTable.id,
    })
    .from(likesTable)
    .where(eq(likesTable.tweetId, tweet_id_num))
    .execute();

  const numLikes = likes.length;

  const [liked] = await db
    .select({
      id: likesTable.id,
    })
    .from(likesTable)
    .where(
      and(
        eq(likesTable.tweetId, tweet_id_num),
        eq(likesTable.userHandle, handle ?? ""),
      ),
    )
    .execute();

  const [user] = await db
    .select({
      displayName: usersTable.displayName,
      handle: usersTable.handle,
    })
    .from(usersTable)
    .where(eq(usersTable.handle, tweetData.userHandle))
    .execute();

  const tweet = {
    id: tweetData.id,
    content: tweetData.content,
    username: user.displayName,
    handle: user.handle,
    likes: numLikes,
    createdAt: tweetData.createdAt,
    startDate: tweetData.startDate, 
    endDate: tweetData.endDate, 
    liked: Boolean(liked),
  };

  // The following code is almost identical to the code in src/app/page.tsx
  // read the comments there for more info.
  const likesSubquery = db.$with("likes_count").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        likes: sql<number | null>`count(*)`.mapWith(Number).as("likes"),
      })
      .from(likesTable)
      .groupBy(likesTable.tweetId),
  );

  const likedSubquery = db.$with("liked").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        liked: sql<number>`1`.mapWith(Boolean).as("liked"),
      })
      .from(likesTable)
      .where(eq(likesTable.userHandle, handle ?? "")),
  );

  const replies = await db
    .with(likesSubquery, likedSubquery)
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      likes: likesSubquery.likes,
      createdAt: tweetsTable.createdAt,
      liked: likedSubquery.liked,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.replyToTweetId, tweet_id_num))
    .orderBy(desc(tweetsTable.createdAt))
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .leftJoin(likedSubquery, eq(tweetsTable.id, likedSubquery.tweetId))
    .execute();
   
    const startDate = new Date(tweet.startDate);
    const endDate = new Date(tweet.endDate);
    
    const startDateString = startDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
    });
    
    const endDateString = endDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",

    });
    
    
  return (
    <>
   <div className="flex h-screen w-full flex-col overflow-scroll pt-2">
  <div className="mb-2 flex items-center gap-8 px-4">
    <Link href={{ pathname: "/", query: { username, handle } }}>
      <ArrowLeft size={18} />
    </Link>
    <h1 className="text-xl font-bold">Tweet</h1>
  </div>

  <div className="flex flex-col px-4 pt-3">
    <div className="flex justify-between items-center mb-4">
      <div>
        <p className="font-bold">{tweet.username ?? "..."}</p>
        {/* Uncomment the next line if you want to display the handle */}
        {/* <p className="font-normal text-gray-500">@{tweet.handle ?? "..."}</p> */}
      </div>
      <div className="flex gap-3">
        <LikeButton
          handle={handle}
          initialLikes={tweet.likes}
          initialLiked={tweet.liked}
          tweetId={tweet.id}
        />
        {/* <button className="h-fit rounded-full p-2.5 text-gray-400 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
          <MoreHorizontal size={16} />
        </button> */}
      </div>
    </div>

    <article className="mt-3 whitespace-pre-wrap text-xl">
      {tweet.content}
    </article>


    <div className="flex gap-3 items-center mt-4"> 
  <p className="font-bold mb-2">開始時間: {startDateString}</p>
  <p className="font-bold mb-2">結束時間: {endDateString}</p>
  <div className="ml-auto">
    <p className="mb-2">{tweet.likes} 人已參加</p>
  </div>

</div>

    <Separator />
    <ReplyInput replyToTweetId={tweet.id} replyToHandle={tweet.handle} />
    <Separator />

    {replies.map((reply) => (
      <Reply
        key={reply.id}
        id={reply.id}
        username={username}
        handle={handle}
        authorName={reply.username}
        authorHandle={reply.handle}
        content={reply.content}
        likes={reply.likes}
        liked={reply.liked}
        createdAt={reply.createdAt!}
      />
    ))}
  </div>
</div>
    </>
  );
}
