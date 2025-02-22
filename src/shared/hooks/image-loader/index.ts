import React from 'react';

interface UseImageLoaderProps {
  imgUrl: string;
}

interface ImageLoaderResponse {
  isLoading: boolean;
  imgSrc: string | null;
}

export const useImageLazyLoader = ({
  imgUrl,
}: UseImageLoaderProps): ImageLoaderResponse => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      setIsLoading(false);
      setImgSrc(imgUrl);
    };

    img.onerror = () => {
      setIsLoading(false);
      setImgSrc(null);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imgUrl]);

  return { isLoading, imgSrc };
};
