import React from 'react';

import { twMerge } from 'tailwind-merge';

import { X } from '@phosphor-icons/react/dist/ssr';

interface DialogProps {
  title?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  closeOnOutside?: boolean;
  contentClassNames?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  isOpen,
  onClose,
  closeOnOutside = false,
  contentClassNames,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'escape') {
        if (onClose) onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        closeOnOutside &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeOnOutside, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        ref={modalRef}
        className={twMerge(
          `bg-white rounded-lg max-w-lg shadow-lg w-full p-4`,
          contentClassNames,
        )}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          {!!onClose && (
            <button
              data-testid="btn-close-dialog"
              aria-label="Close modal"
              onClick={onClose}
              className="text-slate-600 rounded-full p-[0.125rem] hover:bg-slate-200"
            >
              <X className="size-5" weight="bold" />
            </button>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
