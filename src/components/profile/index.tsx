import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import { IUser } from '@/interfaces';
import { updateUserService, uploadFileService } from '@/services';
import { useMenuProfile } from '@/store';

import { useAccountSettingsModel } from './profile.model';
import { ProfileView } from './profile.view';

export const Profile: React.FC = () => {
  const http = new HttpClient();

  const services = {
    updateUser: (id: number, data: IUser) => updateUserService(http, id, data),
    uploadFile: (data: FormData) => uploadFileService(http, data),
  };

  const methods = useAccountSettingsModel(services);
  const profile = useMenuProfile();

  return <ProfileView {...profile} {...methods} />;
};
