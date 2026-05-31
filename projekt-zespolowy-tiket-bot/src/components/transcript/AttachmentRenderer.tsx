"use client";

import { FileText } from "lucide-react";
import { ImageAttachment } from "./ImageAttachment";
import { VideoAttachment } from "./VideoAttachment";
import { FileAttachment } from "./FileAttachment";


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
if (attachment.fileType.startsWith("image/")) {
  return (
    <ImageAttachment
      id={attachment.id}
      fileName={attachment.fileName}
    />
  );
}

if (attachment.fileType.startsWith("video/")) {
  return (
    <VideoAttachment
      id={attachment.id}
    />
  );
}

return (
  <FileAttachment
    id={attachment.id}
    fileName={attachment.fileName}
    size={attachment.fileSize}
  />
);
      <FileText size={18} />
      <span>{attachment.fileName}</span>
    </a>
  );
}
