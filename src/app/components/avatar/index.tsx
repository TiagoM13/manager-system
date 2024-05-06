import React from 'react';

type Props = {
  imageUrl: string
  name: string
  small?: boolean
  color?: "light" | "dark"
}

export const Avatar: React.FC<Props> = ({ imageUrl, name, small, color }) => {
  return (
    <div className={`
      ${small ? "size-[45px] " : "size-16"}
      ${color === "light" ? "border-white" : "border-slate-700"}
      border-[1.5px] rounded-full`}
    >
      <img src={imageUrl} alt={name} className="rounded-full" />
    </div>
  );
}
