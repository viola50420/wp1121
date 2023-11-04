<<<<<<< HEAD
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useTweet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTweet = async ({
    handle,
    content,
    replyToTweetId,
    startDate,
    endDate,
  }: {
    handle: string;
    content: string;
    replyToTweetId?: number;
    startDate: string;
    endDate: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({
        handle,
        content,
        replyToTweetId,
        startDate,
        endDate,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  return {
    postTweet,
    loading,
  };
}
=======
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useTweet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTweet = async ({
    handle,
    content,
    replyToTweetId,
    startDate,
    endDate,
  }: {
    handle: string;
    content: string;
    replyToTweetId?: number;
    startDate: string;
    endDate: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({
        handle,
        content,
        replyToTweetId,
        startDate,
        endDate,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  return {
    postTweet,
    loading,
  };
}
>>>>>>> 6ecb75983d8428b6a12ca9627138fc7a487c7898
