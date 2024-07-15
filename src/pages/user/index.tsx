import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Header, Divider } from '@/components';
import { FormContainer } from '@/components/form-container';
import { useUser } from '@/hooks';
import { IUser } from '@/interfaces';

import { StatusForm } from './forms/status-form';
import UserForm from './forms/user-form';
import { formSchema } from './schemas';

const User: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, data, getUser: refreshUser } = useUser();

  const newUser = React.useMemo(() => id === 'new', [id]);

  // Hook Form
  const methods = useForm<IUser>({
    resolver: formSchema as any,
    shouldUnregister: false,
  });

  const { handleSubmit } = methods;

  const handleCancel = React.useCallback(() => {
    navigate('/users');
  }, [navigate]);

  const submit = React.useCallback(async (values: IUser) => {
    console.log(values);
  }, []);

  React.useEffect(() => {
    if (!newUser) {
      refreshUser(Number(id));
    }
  }, [id, newUser, refreshUser]);

  return (
    <FormProvider {...methods}>
      <FormContainer noValidate onSubmit={handleSubmit(submit)}>
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
              <UserForm loading={loading} isNew={newUser} />
            </div>

            {!newUser && (
              <div className="w-[40%]">
                <StatusForm loading={loading} />
              </div>
            )}
          </div>
        </div>
      </FormContainer>
    </FormProvider>
  );
};

export default User;
