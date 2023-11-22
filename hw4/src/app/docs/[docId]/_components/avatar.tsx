import React from "react";

type Props = {
  displayId: User["displayId"];
  classname?: string;
};

function Avatar({ displayId, classname }: Props) {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${classname}`}
    >
      <span className="text-sm font-semibold">
        {/* The first letter of text */}
        {displayId.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export default Avatar;
