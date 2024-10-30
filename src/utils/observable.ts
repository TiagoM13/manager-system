import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@/infra/http/http-client';
import { getUserService } from '@/services';
import { getCurrentUser, logout } from '@/store/modules/auth/actions';

import { handleAPIErrors } from './common';
import { toastError } from './toasts';

export const userRole$ = new BehaviorSubject(getCurrentUser()?.role);
export const userStatus$ = new BehaviorSubject(getCurrentUser()?.status);

export const userObservable = async () => {
  const httpClient = new HttpClient();

  const localUser = getCurrentUser();
  if (!localUser) return;

  try {
    const serverUser = await getUserService(httpClient, localUser.id);

    if (serverUser) {
      userRole$.next(serverUser.role);
      userStatus$.next(serverUser.status);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      await logout();
      toastError('Sua conta foi excluída!');
      return;
    }
    handleAPIErrors(error);
  }
};
