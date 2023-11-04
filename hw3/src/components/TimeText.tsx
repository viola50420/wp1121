<<<<<<< HEAD
"use client";

import dayjs from "dayjs";

type TimeTextProps = {
  date: dayjs.ConfigType;
  format: string;
};

export default function TimeText({ date, format }: TimeTextProps) {
  // we render the time on client side to make sure it's in the user's timezone
  // if we do this on the server side, it will render the time in the server's timezone
  // dayjs is a great library for working with dates in javascript
  // we use it to format the date in a nice way
  return <>{dayjs(date).format(format)}</>;
}
=======
"use client";

import dayjs from "dayjs";

type TimeTextProps = {
  date: dayjs.ConfigType;
  format: string;
};

export default function TimeText({ date, format }: TimeTextProps) {
  // we render the time on client side to make sure it's in the user's timezone
  // if we do this on the server side, it will render the time in the server's timezone
  // dayjs is a great library for working with dates in javascript
  // we use it to format the date in a nice way
  return <>{dayjs(date).format(format)}</>;
}
>>>>>>> 6ecb75983d8428b6a12ca9627138fc7a487c7898
