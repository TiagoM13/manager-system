import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Header,
  Divider,
  Card,
  Select,
  InputFile,
  Input,
  InputRadio,
} from '@/components';
import { UserTypes } from '@/enums';

type ParamsProps = {
  id: string;
};

const User: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<ParamsProps>();

  const newUser = params.id === 'new';

  const handleCancel = React.useCallback(() => {
    navigate('/users');
  }, [navigate]);

  const selectOptions = Object.values(UserTypes).map((label, index) => ({
    id: index,
    label,
  }));

  return (
    <div className="flex flex-col">
      <Header
        title={newUser ? 'Cadastrar usuário' : 'Atualizar usuário'}
        hasRegister={false}
        hasActions
        onCancel={handleCancel}
        buttonLabels={{
          saved: newUser ? 'salvar usuário' : 'atualizar usuário',
        }}
      />
      <Divider />

      <div className="max-w-[1440px] flex gap-5">
        <div className="w-[60%]">
          <Card title="Informações do usuário" className="px-6" bordered>
            <div className="space-y-4 mb-20">
              <InputFile
                hasPreview
                placeholder={newUser ? 'Escolher foto' : 'Alterar foto'}
              />

              <div className="grid grid-cols-2 gap-5">
                <Input
                  id="name"
                  name="name"
                  label="Nome"
                  placeholder="Digite seu nome completo"
                  required
                  className="text-red-300"
                />

                <Input
                  id="email"
                  name="email"
                  label="E-mail"
                  type="email"
                  placeholder="Digite seu e-mail"
                  required
                />

                <Select
                  label="Tipo de usuário"
                  placeholder="Selcione um tipo de usuário"
                  options={selectOptions}
                  required
                />
              </div>
            </div>
          </Card>
        </div>

        {!newUser && (
          <div className="w-[40%]">
            <Card title="Status do usuário" className="px-6" bordered>
              <div className="py-2 mt-4">
                <InputRadio
                  label="Status"
                  name="opt-status"
                  options={{
                    opt1: 'Ativo',
                    opt2: 'Inativo',
                  }}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
