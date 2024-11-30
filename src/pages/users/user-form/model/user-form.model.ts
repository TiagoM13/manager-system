import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ERROR_PROCESSING_IMAGE } from '@/components/profile/profile.messages';
import { Role } from '@/enums';
import { useAppNavigation, useCurrentUser } from '@/hooks';
import { IMSResponse, IUploadFile, IUser } from '@/interfaces';
import { useImageUrl, useName } from '@/store';
import { toastError, toastSuccess } from '@/utils';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

import {
  ERROR_CREATING_USER,
  ERROR_UPDATING_USER,
  USER_CREATED_SUCCESSFULLY,
  USER_UPDATED_SUCCESSFULLY,
} from '../user-form.messages';
import { userDataSchema, UserDataSchemaType } from '../user-form.schema';

type UserDataResponse = IUser | undefined;
type UserRequestResult = IMSResponse<IUser, 'user'> | undefined;

interface IUserFormModelProps {
  getUser: (id: number) => Promise<UserDataResponse>;
  createUser: (data: IUser) => Promise<UserRequestResult>;
  updateUser: (id: number, data: IUser) => Promise<UserRequestResult>;
  uploadFile: (data: FormData) => Promise<IUploadFile | undefined>;
  updateUserStatus: (id: number, status: string) => Promise<string | undefined>;
}

export const useUserFormModel = ({
  getUser,
  createUser,
  updateUser,
  updateUserStatus,
  uploadFile,
}: IUserFormModelProps) => {
  // Hooks
  const navigate = useNavigate();
  const { goBack } = useAppNavigation();
  const { setImageUrl } = useImageUrl();
  const { setName } = useName();
  const { id } = useParams<{ id: string }>();
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const isCreatingNewUser = React.useMemo(() => id === 'new', [id]);

  // Queries
  const { data: user, isLoading: isLoadingUser } = useQuery<UserDataResponse>({
    queryKey: ['user'],
    queryFn: async () => await getUser(Number(id)),
    enabled: !isCreatingNewUser,
  });
  // Mutations
  const { mutateAsync: createUserMutation, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: async (values: IUser) => await createUser(values),
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.invalidateQueries({ queryKey: ['users'] });
          toastSuccess(USER_CREATED_SUCCESSFULLY);
          navigate('/users');
        }
      },
      onError: () => toastError(ERROR_CREATING_USER),
    });
  const { mutateAsync: updateUserMutation, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: async (values: IUser) => await updateUser(Number(id), values),
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.invalidateQueries({ queryKey: ['user', id] });
          toastSuccess(USER_UPDATED_SUCCESSFULLY);
          navigate('/users');
        }
      },
      onError: () => toastError(ERROR_UPDATING_USER),
    });
  const { mutateAsync: updateUserStatusMutation, isPending: isLoadingStatus } =
    useMutation({
      mutationFn: async ({ id, status }: { id: number; status: string }) =>
        await updateUserStatus(id, status),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ['user', id] }),
    });
  const { mutateAsync: uploadFileMutation, isPending: isLoadingUpload } =
    useMutation({
      mutationFn: uploadFile,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ['user', id] }),
      onError: () => toastError(ERROR_PROCESSING_IMAGE),
    });

  // Hook Form
  const methods = useForm<UserDataSchemaType>({
    resolver: userDataSchema as any,
    shouldUnregister: false,
  });
  const { handleSubmit, reset } = methods;

  // memos
  const isLoading = React.useMemo(
    () =>
      isLoadingUser ||
      isLoadingUpload ||
      isLoadingCreate ||
      isLoadingUpdate ||
      isLoadingStatus,
    [
      isLoadingUser,
      isLoadingCreate,
      isLoadingUpdate,
      isLoadingUpload,
      isLoadingStatus,
    ],
  );

  // callbacks
  const handleFileUpload = React.useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const fileToUpload = formData.get('image_url');

      if (fileToUpload && fileToUpload instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.set('file', fileToUpload);
        const uploadResponse = await uploadFileMutation(uploadFormData);
        return uploadResponse?.fileUrl;
      }

      return null;
    },
    [uploadFileMutation],
  );

  const submit = React.useCallback(
    async (values: UserDataSchemaType) => {
      const formElement = document.querySelector(
        '#form-user',
      ) as HTMLFormElement;
      let updatedImageUrl = values.image_url;

      const shouldUploadNewImage =
        values.image_url && values.image_url !== user?.image_url && formElement;

      if (shouldUploadNewImage) {
        updatedImageUrl = await handleFileUpload(formElement);
      }

      const statusHasChanged = values.status !== user?.status;

      if (!isCreatingNewUser && statusHasChanged) {
        await updateUserStatusMutation({
          id: Number(id),
          status: String(values.status),
        });
      }

      const savedValues: IUser = {
        name: values.name,
        email: values.email,
        role: values.role as Role,
        image_url: updatedImageUrl,
      };

      if (isCreatingNewUser) {
        await createUserMutation(savedValues);
      } else {
        await updateUserMutation(savedValues);
      }
    },
    [
      id,
      user?.image_url,
      user?.status,
      isCreatingNewUser,
      handleFileUpload,
      updateUserStatusMutation,
      createUserMutation,
      updateUserMutation,
    ],
  );

  React.useEffect(() => {
    if (!isLoading) {
      if (isCreatingNewUser) {
        reset();
        setImageUrl(undefined);
        setName('');
      } else if (user) {
        reset(user);
        setImageUrl(user.image_url);
        setName(user.name);
      }
    }
  }, [isLoading, isCreatingNewUser, reset, setImageUrl, setName, user]);

  return {
    user,
    currentUser,
    isCreatingNewUser,
    isUpdatingItself: !isCreatingNewUser && user?.id === currentUser.id,
    methods,
    submit,
    handleSubmit,
    isLoading,
    goBack,
  };
};
