import React, { useRef } from 'react';

import { DotsThreeOutline, PencilSimple, Trash } from '@phosphor-icons/react';

export type ButtonActionsProps = React.ComponentProps<'button'> & {
  onDelete: () => void;
  onEdit: () => void;
};

export const ButtonActions: React.FC<ButtonActionsProps> = ({
  onDelete,
  onEdit,
  ...props
}) => {
  const [activeOptions, setActiveOptions] = React.useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleActiveActions = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveOptions((prev) => !prev);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setActiveOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeOptions]);

  return (
    <div className="relative">
      <button
        {...props}
        ref={buttonRef}
        onClick={(event) => handleToggleActiveActions(event)}
        className="bg-white hover:bg-slate-200/50 border border-slate-400/50 rounded-md p-1.5 duration-300 disabled:bg-slate-300/50 disabled:hover:bg-slate-300/50 outline-slate-400"
      >
        <DotsThreeOutline className="size-4 text-slate-800" weight="fill" />
      </button>

      <div
        ref={contentRef}
        className={`${activeOptions ? 'block' : 'hidden'} bg-white shadow-sm shadow-slate-400 w-28 absolute top-8 -left-20 rounded-lg z-20`}
      >
        <div className="py-1">
          <button
            onClick={() => {
              setActiveOptions(false);
              onEdit();
            }}
            className="flex items-center gap-4 w-full p-2 hover:bg-sky-100"
          >
            <PencilSimple className="size-4 text-sky-600" weight="bold" />
            <span className="text-sm text-sky-600 text-wrap">Editar</span>
          </button>
          <button
            onClick={() => {
              setActiveOptions(false);
              onDelete();
            }}
            className="flex items-center gap-4 w-full p-2 hover:bg-red-100"
          >
            <Trash className="size-4 text-red-600" weight="bold" />
            <span className="text-sm text-red-600 text-wrap">Deletar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
