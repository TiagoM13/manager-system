import React from 'react';

import { Trash, WarningCircle, X } from '@phosphor-icons/react';

import { Button, Dialog } from '@/components/_ui';
import { useDialog } from '@/store';

export const ConfirmDialog: React.FC = () => {
  const { isOpenDialog: isOpen, closeDialog, config } = useDialog();

  return (
    <Dialog isOpen={isOpen} onClose={closeDialog}>
      <div className="flex w-full flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          {config?.icon || (
            <WarningCircle className="size-10 text-red-400" weight="regular" />
          )}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">
            {config?.header || 'Atenção'}
          </h2>
          <div>{config?.message}</div>
        </div>
      </div>

      <div className="mt-10 flex justify-end gap-4">
        {config?.rejectLabel && (
          <Button
            label={config?.rejectLabel || 'Não'}
            variable={config?.rejectBtnColor || 'secondary'}
            icon={config?.rejectIcon || <X className="size-4" weight="bold" />}
            onClick={closeDialog}
            className="w-full"
          />
        )}
        <Button
          label={config?.acceptLabel || 'Sim'}
          variable={config?.acceptBtnColor || 'danger'}
          icon={
            config?.acceptIcon || <Trash className="size-4" weight="bold" />
          }
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
