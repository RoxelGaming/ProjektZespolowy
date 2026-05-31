"use client";

import { FileText } from "lucide-react";

interface Props {
  id: string;
  fileName: string;
  size?: number;
}

export function FileAttachment({
  id,
  fileName,
  size,
}: Props) {
  return (
    <a
      href={`/api/attachments/${id}`}
      target="_blank"
      rel="noreferrer"
      className="
        flex
        items-center
        gap-3
        p-3
        rounded-lg
        border
        border-gray-700
        bg-[#2b2d31]
        hover:bg-[#313338]
      "
    >
      <FileText size={18} />

      <div>
        <div>{fileName}</div>

        {size && (
          <div className="text-xs text-gray-400">
            {(size / 1024).toFixed(1)} KB
          </div>
        )}
      </div>
    </a>
  );
}
