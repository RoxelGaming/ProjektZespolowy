"use client";

interface Props {
  id: string;
}

export function VideoAttachment({
  id,
}: Props) {
  return (
    <video
      controls
      preload="metadata"
      className="
        max-w-md
        rounded-lg
        mt-2
      "
    >
      <source
        src={`/api/attachments/${id}`}
      />
    </video>
  );
}
