import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Role } from '@/enums';
import {
  useAppNavigation,
  useCreateUser,
  useCurrentUser,
  useGetUser,
  useUpdateUser,
  useUpdateUserStatus,
  useUploadFile,
} from '@/hooks';
import { IMSResponse, IUploadFile, IUser } from '@/interfaces';
import { useImageUrl, useName } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { UserSchemaType, userSchema } from './user-form.schema';

type UserRequestResult = IMSResponse<IUser, 'user'> | undefined;

interface IUserFormModelProps {
  getUser: (id: number) => Promise<IUser | undefined>;
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
  const { goBack } = useAppNavigation();
  const { setImageUrl } = useImageUrl();
  const { setName } = useName();
  const { id } = useParams<{ id: string }>();
  const currentUser = useCurrentUser();

  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    shouldUnregister: false,
  });
  const { handleSubmit, reset } = methods;

  const isCreatingNewUser = React.useMemo(() => id === 'new', [id]);

  const { userResponse, isLoading: isLoadingUser } = useGetUser({
    getUser,
    userId: Number(id),
    isEnabled: !isCreatingNewUser,
  });
  const { createUserMutation, isPending: isPendingCreateUser } = useCreateUser({
    createUser,
  });
  const { updateUserMutation, isPending: isPendingUpdateUser } = useUpdateUser({
    updateUser,
    userId: Number(id),
  });
  const { updateUserStatusMutation, isPending: isPendingUpdateUserStatus } =
    useUpdateUserStatus({
      updateUserStatus,
      userId: Number(id),
    });
  const { uploadFileMutation, isPending: isPendingUploadFile } = useUploadFile({
    uploadFile,
    queryKeys: ['user', Number(id)],
  });

  const isLoading = React.useMemo(
    () =>
      isLoadingUser ||
      isPendingUploadFile ||
      isPendingCreateUser ||
      isPendingUpdateUser ||
      isPendingUpdateUserStatus,
    [
      isLoadingUser,
      isPendingCreateUser,
      isPendingUpdateUser,
      isPendingUpdateUserStatus,
      isPendingUploadFile,
    ],
  );

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

  const handleImageUpdate = React.useCallback(
    async (values: UserSchemaType): Promise<string | null | undefined> => {
      const formElement = document.querySelector(
        '#form-user',
      ) as HTMLFormElement;
      const shouldUploadNewImage =
        values.image_url &&
        values.image_url !== userResponse?.image_url &&
        formElement;

      if (shouldUploadNewImage) {
        return await handleFileUpload(formElement);
      }

      return values.image_url;
    },
    [handleFileUpload, userResponse?.image_url],
  );

  const hasUserStatusChanged = React.useCallback(
    (values: UserSchemaType): boolean => {
      return values.status !== userResponse?.status;
    },
    [userResponse?.status],
  );

  const handleUpdateUserStatus = React.useCallback(
    async (values: UserSchemaType): Promise<void> => {
      await updateUserStatusMutation({
        id: Number(id),
        status: String(values.status),
      });
    },
    [id, updateUserStatusMutation],
  );

  const prepareUserPayload = ({
    values,
    imageUrl,
  }: {
    values: UserSchemaType;
    imageUrl: string;
  }): IUser => {
    return {
      name: values.name,
      email: values.email,
      role: values.role as Role,
      image_url: imageUrl,
    };
  };

  const handleSaveUser = React.useCallback(
    async (values: UserSchemaType) => {
      const updatedImageUrl = await handleImageUpdate(values);
      const statusHasChanged = hasUserStatusChanged(values);

      if (!isCreatingNewUser && statusHasChanged) {
        await handleUpdateUserStatus(values);
      }

      const savedValues = prepareUserPayload({
        values,
        imageUrl: String(updatedImageUrl),
      });

      if (isCreatingNewUser) {
        await createUserMutation(savedValues);
      } else {
        await updateUserMutation(savedValues);
      }
    },
    [
      handleImageUpdate,
      hasUserStatusChanged,
      isCreatingNewUser,
      handleUpdateUserStatus,
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
      } else if (userResponse) {
        reset(userResponse);
        setImageUrl(userResponse.image_url);
        setName(userResponse.name);
      }
    }
  }, [isCreatingNewUser, isLoading, reset, setImageUrl, setName, userResponse]);

  const isUpdatingItself =
    !isCreatingNewUser && userResponse?.id === currentUser.id;

  return {
    userResponse,
    currentUser,
    isCreatingNewUser,
    isUpdatingItself,
    methods,
    handleSaveUser,
    handleSubmit,
    isLoading,
    goBack,
  };
};
