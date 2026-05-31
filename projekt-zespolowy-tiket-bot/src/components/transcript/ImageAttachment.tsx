"use client";

interface Props {
  id: string;
  fileName: string;
  onOpen?: () => void;
}

export function ImageAttachment({
  id,
  fileName,
  onOpen,
}: Props) {
  return (
    <img
      src={`/api/attachments/${id}`}
      alt={fileName}
      loading="lazy"
      onClick={onOpen}
      className="
        max-w-md
        rounded-lg
        mt-2
        cursor-pointer
        hover:opacity-90
      "
    />
  );
}
