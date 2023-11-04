<<<<<<< HEAD
import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { getAvatar } from "@/lib/utils";

// this is a helper function to get user info in client components
export default function useUserInfo() {
  const searchParams = useSearchParams();
  const username = useMemo(() => searchParams.get("username"), [searchParams]);
  const handle = useMemo(() => searchParams.get("handle"), [searchParams]);
  const avatarURL = useMemo(() => getAvatar(username), [username]);

  return {
    username,
    handle,
    avatarURL,
  };
}
=======
import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { getAvatar } from "@/lib/utils";

// this is a helper function to get user info in client components
export default function useUserInfo() {
  const searchParams = useSearchParams();
  const username = useMemo(() => searchParams.get("username"), [searchParams]);
  const handle = useMemo(() => searchParams.get("handle"), [searchParams]);
  const avatarURL = useMemo(() => getAvatar(username), [username]);

  return {
    username,
    handle,
    avatarURL,
  };
}
>>>>>>> 6ecb75983d8428b6a12ca9627138fc7a487c7898
