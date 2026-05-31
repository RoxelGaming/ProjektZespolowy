"use client";

import Lightbox from "yet-another-react-lightbox";

interface Props {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
}

export function ImageLightbox({
  open,
  imageUrl,
  onClose,
}: Props) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={[
        {
          src: imageUrl,
        },
      ]}
    />
  );
}
