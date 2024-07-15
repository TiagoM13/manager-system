import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { CircleNotch, UploadSimple } from '@phosphor-icons/react';

import avatarImageUrl from '@/assets/avatars/avatar-woman.jpeg';

import { Avatar } from '../avatar';

interface InputFileProps {
  placeholder?: string;
  loading?: boolean;
  hasPreview?: boolean;
  control: Control<any>;
  name: any;
  error?: FieldError | undefined;
}

export const InputFile: React.FC<InputFileProps> = ({
  placeholder = 'Escolher foto',
  loading = false,
  hasPreview = false,
  control,
  error,
  name,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previwURL = URL.createObjectURL(files[0]);

    setImageUrl(previwURL);
  };

  const defaultAvatar =
    'https://images.nightcafe.studio/jobs/0Kn1rxnTPMBeajQI9rVD/0Kn1rxnTPMBeajQI9rVD--2--bfk8i_2x.jpg?tr=w-1600,c-at_max';

  return (
    <div className="flex items-center gap-5 mt-4">
      {hasPreview && (
        <Avatar
          className="size-32"
          color="dark"
          imageUrl={imageUrl || defaultAvatar}
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
        render={({ field: { onChange } }) => (
          <input
            id="image_url"
            name={name}
            type="file"
            accept=".png,.jpg"
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
