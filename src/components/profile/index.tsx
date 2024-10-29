import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import { IChangePasswordData, IUser } from '@/interfaces';
import {
  changePasswordService,
  updateUserService,
  uploadFileService,
} from '@/services';
import { useMenuProfile } from '@/store';

import { useAccountSettingsModel } from './profile.model';
import { ProfileView } from './profile.view';

export const Profile: React.FC = () => {
  const http = new HttpClient();

  const services = {
    updateUser: (id: number, data: IUser) => updateUserService(http, id, data),
    uploadFile: (data: FormData) => uploadFileService(http, data),
    changePassword: (id: number, data: IChangePasswordData) =>
      changePasswordService(http, id, data),
  };

  const methods = useAccountSettingsModel(services);
  const profile = useMenuProfile();

  return <ProfileView {...profile} {...methods} />;
};
