"use client";

import { MessageItem } from "./MessageItem";

import { TranscriptMessage } from "@/src/types/transcript";

interface Props {
  messages: TranscriptMessage[];
}

export function TranscriptViewer({
  messages,
}: Props) {
  return (
    <div className="bg-[#313338] rounded-lg overflow-hidden border border-[#1e1f22]">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}
