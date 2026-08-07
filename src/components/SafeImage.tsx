import { useState, useEffect, ImgHTMLAttributes } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
}

export const SafeImage = ({ src, fallbackSrc, alt, className, ...props }: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  // Sync state when src prop changes dynamically (e.g. after async API fetch)
  useEffect(() => {
    setImgSrc(src);
    setHasFailed(false);
  }, [src]);

  const handleError = () => {
    if (!hasFailed && fallbackSrc) {
      setHasFailed(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};
