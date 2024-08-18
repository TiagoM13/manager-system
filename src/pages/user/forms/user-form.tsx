import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, InputFile, Select, Input } from '@/components';
import { UserTypes } from '@/enums';
import { IUser } from '@/interfaces';
import { useName } from '@/store';

interface UserFormProps {
  isNew?: boolean;
  loading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ isNew, loading }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IUser>();
  const { name } = useName();

  const selectOptions = Object.values(UserTypes).map((label, index) => ({
    id: index,
    label,
  }));

  return (
    <Card title="Informações do usuário" className="px-6" bordered>
      <div className="space-y-4 mb-20">
        <InputFile
          name={name}
          control={control}
          placeholder={isNew ? 'Escolher foto' : 'Alterar foto'}
          error={errors.image_url}
          loading={loading}
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
            disabled={loading}
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
            disabled={loading}
            error={errors.email}
            required
          />

          <Select
            control={control}
            name="user_type"
            label="Tipo de usuário"
            defaultValue=""
            placeholder="Selcione um tipo de usuário"
            options={selectOptions}
            disabled={loading}
            setValue={setValue}
            error={errors.user_type}
            required
          />
        </div>
      </div>
    </Card>
  );
};
