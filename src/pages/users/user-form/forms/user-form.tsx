import React from 'react';
import { useFormContext } from 'react-hook-form';

import { UploadAvatar } from '@/components';
import { Card, Select, Input } from '@/components/_ui';
import { IUser } from '@/shared/interfaces';

import { roleOptions } from '../utils/options';

interface UserFormProps {
  isNew?: boolean;
  loading?: boolean;
  isUpdatingItself: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  isNew,
  loading,
  isUpdatingItself,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IUser>();

  return (
    <Card title="Informações do usuário" className="px-6" bordered>
      <div className="mb-20 space-y-4">
        <UploadAvatar
          name="image_url"
          control={control}
          placeholder={isNew ? 'Escolher foto' : 'Alterar foto'}
          error={errors.image_url}
          loading={!isNew && loading}
          disabled={loading || (!isUpdatingItself && !isNew)}
          hasPreview
        />

        <div className="grid grid-cols-2 gap-5">
          <Input
            id="name"
            name="name"
            label="Nome"
            defaultValue=""
            control={control}
            placeholder="Digite seu nome completo"
            className="text-red-300"
            disabled={loading || (!isUpdatingItself && !isNew)}
            error={errors.name}
            required
          />

          <Input
            id="email"
            name="email"
            label="E-mail"
            type="email"
            defaultValue=""
            control={control}
            placeholder="Digite seu e-mail"
            disabled={loading || !isNew}
            error={errors.email}
            required
          />

          <Select
            control={control}
            name="role"
            label="Tipo de usuário"
            defaultValue=""
            placeholder="Selcione um tipo de usuário"
            options={roleOptions}
            disabled={loading || isUpdatingItself}
            setValue={setValue}
            error={errors.role}
            valueAs="value"
            labelAs="label"
            required
          />
        </div>
      </div>
    </Card>
  );
};
