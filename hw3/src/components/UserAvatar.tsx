<<<<<<< HEAD
"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  className?: string;
};

export default function UserAvatar({ className }: UserAvatarProps) {
  const { avatarURL } = useUserInfo();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarURL}
      alt="user avatar"
      width={48}
      height={48}
      className={cn(className, "rounded-full")}
    />
  );
}
=======
"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  className?: string;
};

export default function UserAvatar({ className }: UserAvatarProps) {
  const { avatarURL } = useUserInfo();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarURL}
      alt="user avatar"
      width={48}
      height={48}
      className={cn(className, "rounded-full")}
    />
  );
}
>>>>>>> 6ecb75983d8428b6a12ca9627138fc7a487c7898
