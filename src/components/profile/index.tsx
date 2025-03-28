import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import {
  changePasswordService,
  updateUserService,
  uploadFileService,
} from '@/shared/api';
import { useMenuProfile } from '@/store';

import {
  IAccountSettingsModelProps,
  useAccountSettingsModel,
} from './profile.model';
import { ProfileView } from './profile.view';

export const Profile: React.FC = () => {
  const http = new HttpClient();

  const services: IAccountSettingsModelProps = {
    updateUserService: (id, data) => updateUserService(http, id, data),
    uploadFileService: (data) => uploadFileService(http, data),
    changePasswordService: (id, data) => changePasswordService(http, id, data),
  };

  const methods = useAccountSettingsModel(services);
  const profile = useMenuProfile();

  return <ProfileView {...profile} {...methods} />;
};
