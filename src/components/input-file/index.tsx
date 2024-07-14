import React from 'react';

import { CircleNotch, UploadSimple } from '@phosphor-icons/react';

import { Avatar } from '../avatar';

interface InputFileProps {
  placeholder?: string;
  loading?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  hasPreview?: boolean;
}

export const InputFile: React.FC<InputFileProps> = ({
  placeholder = 'Escolher foto',
  loading = false,
  onChange,
  hasPreview = false,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    if (onChange) {
      onChange(event);
    }
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

      <input
        id="image_url"
        name="image_url"
        type="file"
        accept=".png,.jpg"
        className="hidden"
        disabled={loading}
        onChange={handleFileChange}
      />
    </div>
  );
};
