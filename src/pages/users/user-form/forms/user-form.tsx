import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, UploadAvatar, Select, Input } from '@/components';
import { IUser } from '@/interfaces';

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

  const selectOptions = [
    { value: 0, label: 'adiministrador' },
    { value: 1, label: 'editor' },
    { value: 2, label: 'clínico' },
  ];

  return (
    <Card title="Informações do usuário" className="px-6" bordered>
      <div className="space-y-4 mb-20">
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
            options={selectOptions}
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
