import React from 'react';
import { Control, FieldError } from 'react-hook-form';

import defaultImageAvatar from '@/assets/avatars/avatar-user.jpg';
import { useImageUrl, useName } from '@/store';

import { Avatar } from '../avatar';
import { FileUploadInput } from '../input/components/input-file';

interface InputFileProps {
  placeholder?: string;
  loading?: boolean;
  hasPreview?: boolean;
  control: Control<any>;
  name?: any;
  defaultValue?: any;
  error?: FieldError | undefined;
  flexCol?: boolean;
}

export const InputFile: React.FC<InputFileProps> = ({
  placeholder,
  loading = false,
  hasPreview = false,
  flexCol = false,
  defaultValue,
  control,
  error,
  name,
}) => {
  const { name: altName } = useName();
  const { imageUrl, setImageUrl } = useImageUrl();

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previwURL = URL.createObjectURL(files[0]);

    setImageUrl(previwURL);
  };

  const renderImageUrl = React.useMemo(() => {
    if (imageUrl === null) return imageUrl;
    if (!imageUrl) return defaultImageAvatar;

    return imageUrl;
  }, [imageUrl]);

  return (
    <div
      className={`flex ${flexCol ? 'flex-col' : ''} items-center gap-5 mt-4`}
    >
      {hasPreview && (
        <Avatar
          className="size-32 text-3xl"
          color="dark"
          imageUrl={renderImageUrl}
          name={altName}
          loading={loading}
        />
      )}

      <FileUploadInput
        name={name}
        control={control}
        placeholder={placeholder}
        defaultValue={defaultValue}
        error={error}
        onChangeFileSelected={handleFileSelected}
      />
    </div>
  );
};
