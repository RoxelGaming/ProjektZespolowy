"use client";

import React, { memo } from "react";

import { TranscriptMessage } from "@/src/types/transcript";

import { formatDate } from "@/src/lib/transcript/formatDate";

import { DiscordTextParser } from "./DiscordTextParser";

import { AttachmentRenderer } from "./AttachmentRenderer";

interface Props {
  message: TranscriptMessage;
}

function MessageItemComponent({
  message,
}: Props) {
  return (
    <div className="flex gap-4 px-4 py-2 hover:bg-white/[0.03] transition-colors">
      <img
        src={message.author.avatar}
        alt={message.author.username}
        loading="lazy"
        className="w-10 h-10 rounded-full shrink-0"
      />

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {message.author.username}
          </span>

          {message.author.isBot && (
            <span className="bg-blue-600 text-white text-[10px] px-1 rounded">
              BOT
            </span>
          )}

          <span className="text-xs text-gray-500">
            {formatDate(message.createdAt)}
          </span>
        </div>

        <div className="text-gray-200 break-words">
          <DiscordTextParser
            content={message.content}
          />

          {message.isEdited && (
            <span className="text-xs text-gray-500 ml-1">
              (edytowano)
            </span>
          )}

          {message.attachments?.map((attachment) => (
            <AttachmentRenderer
              key={attachment.id}
              attachment={attachment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const MessageItem = memo(
  MessageItemComponent
);
