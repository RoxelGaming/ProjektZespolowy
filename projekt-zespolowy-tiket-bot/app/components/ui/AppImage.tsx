import NextImage, { ImageProps } from 'next/image';

export default function AppImage({ src, ...props }: ImageProps) {
  const isProd = process.env.NODE_ENV === 'production';
  let finalSrc = src;

  if (typeof src === 'string' && src.startsWith('/')) {
    finalSrc = isProd ? `/projektzespolowy${src}` : src;
  }

  // Zwracamy oryginalny Image z podmienioną ścieżką
  return <NextImage src={finalSrc} {...props} />;
}