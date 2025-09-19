import Image from 'next/image';

type MediaComponentProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function MediaComponent({
  src,
  alt,
  width = 400,
  height = 250,
  className,
  sizes,
  priority = false,
}: MediaComponentProps) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.mov') || src.endsWith('.webm');

  if (isVideo) {
    return (
      <video
        autoPlay
        className={className}
        disablePictureInPicture
        height={height}
        loop
        muted
        playsInline
        preload="metadata"
        width={width}
      >
        <source src={src} type="video/mp4" />
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      height={height}
      priority={priority}
      sizes={sizes}
      src={src}
      width={width}
    />
  );
}
