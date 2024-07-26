import React from 'react';

import { Trash, WarningCircle, X } from '@phosphor-icons/react';

import { useDialog } from '@/store';

import { Button } from '../button';
import { Dialog } from '../dialog';

export const ConfirmDialog: React.FC = () => {
  const { isOpenDialog: isOpen, closeDialog, config } = useDialog();

  return (
    <Dialog isOpen={isOpen} onClose={closeDialog}>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
          <WarningCircle className="size-10 text-red-400" weight="regular" />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">
            {config?.header || 'Atenção'}
          </h2>
          <div>{config?.message}</div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-10">
        <Button
          label={config?.rejectLabel || 'Não'}
          variable="secondary"
          icon={<X className="size-4" weight="bold" />}
          onClick={closeDialog}
          className="w-full"
        />
        <Button
          label={config?.acceptLabel || 'Sim'}
          variable="danger"
          icon={<Trash className="size-4" weight="bold" />}
          onClick={() => {
            config?.accept();
            closeDialog();
          }}
          className="w-full"
        />
      </div>
    </Dialog>
  );
};
