"use client";

import { useState } from "react";

interface Props {
  text: string;
}

export function Spoiler({ text }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      onClick={() => setVisible(!visible)}
      className={`
        cursor-pointer rounded px-1
        ${visible
          ? "bg-gray-700 text-white"
          : "bg-gray-700 text-gray-700 hover:text-gray-500"}
      `}
    >
      {text}
    </span>
  );
}
