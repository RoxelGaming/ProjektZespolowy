"use client";

import { FileText } from "lucide-react";

interface Props {
  attachment: {
    id: string;
    fileName: string;
    fileType: string;
  };
}

export function AttachmentRenderer({
  attachment,
}: Props) {
  const fileUrl = `/api/attachments/${attachment.id}`;

  if (attachment.fileType.startsWith("image/")) {
    return (
      <img
        src={fileUrl}
        alt={attachment.fileName}
        loading="lazy"
        className="max-w-sm rounded-lg mt-2 cursor-pointer hover:opacity-90"
      />
    );
  }

  if (attachment.fileType.startsWith("video/")) {
    return (
      <video
        controls
        preload="metadata"
        className="max-w-sm rounded-lg mt-2"
      >
        <source src={fileUrl} />
      </video>
    );
  }

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 p-3 mt-2 bg-[#2b2d31] border border-gray-700 rounded-lg hover:bg-[#313338]"
    >
      <FileText size={18} />
      <span>{attachment.fileName}</span>
    </a>
  );
}
