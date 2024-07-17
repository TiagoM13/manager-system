import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { CircleNotch, UploadSimple } from '@phosphor-icons/react';

import avatarImageUrl from '@/assets/avatars/avatar-user.jpg';
import { useUser } from '@/hooks';

import { Avatar } from '../avatar';

interface InputFileProps {
  placeholder?: string;
  loading?: boolean;
  hasPreview?: boolean;
  control: Control<any>;
  name?: any;
  defaultValue?: any;
  error?: FieldError | undefined;
}

export const InputFile: React.FC<InputFileProps> = ({
  placeholder = 'Escolher foto',
  loading = false,
  hasPreview = false,
  defaultValue,
  control,
  error,
  name,
}) => {
  const { data } = useUser();
  const { id } = useParams<{ id: string }>();
  const newUser = React.useMemo(() => id === 'new', [id]);

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previwURL = URL.createObjectURL(files[0]);

    setImageUrl(previwURL);
  };

  // TODO - REMOVE
  React.useEffect(() => {
    if (data && !newUser) {
      setImageUrl(data?.image_url as string);
    }
  }, [data, newUser]);

  const renderImageUrl = React.useMemo(() => {
    if (loading) return avatarImageUrl;
    if (imageUrl) return imageUrl;
    if (imageUrl === undefined) return avatarImageUrl;
    if (imageUrl === '') return avatarImageUrl;
    return avatarImageUrl;
  }, [imageUrl, loading]);

  return (
    <div className="flex items-center gap-5 mt-4">
      {hasPreview && (
        <Avatar
          className="size-32"
          color="dark"
          imageUrl={renderImageUrl}
          name="avatar"
        />
      )}

      <label
        htmlFor="image_url"
        className={`bg-sky-600 flex items-center gap-3 py-2 px-4 rounded-md transition-all ease-in duration-500 focus-visible:bg-sky-600 text-sm font-medium text-white ${loading ? 'bg-sky-700' : 'hover:bg-sky-500 cursor-pointer'}`}
      >
        {loading ? (
          <CircleNotch
            weight="bold"
            color="white"
            className="size-5 animate-spin"
          />
        ) : (
          <UploadSimple className="size-5 text-white" weight="bold" />
        )}

        {placeholder}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <input
            name={name}
            id="image_url"
            type="file"
            accept="image/*"
            className="hidden"
            disabled={loading}
            onChange={(e) => {
              onChange(e);
              handleFileSelected(e);
            }}
          />
        )}
      />

      {!!error && (
        <span className="block text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </div>
  );
};
