import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ERROR_PROCESSING_IMAGE } from '@/components/profile/profile.messages';
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
}

export const useUserFormModel = ({
  getUser,
  createUser,
  updateUser,
  uploadFile,
}: IUserFormModelProps) => {
  // hooks
  const navigate = useNavigate();
  const { goBack } = useAppNavigation();
  const { setImageUrl } = useImageUrl();
  const { setName } = useName();
  const { id } = useParams<{ id: string }>();
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const newUser = React.useMemo(() => id === 'new', [id]);

  // queries
  const { data: user, isLoading: isLoadingGetUser } =
    useQuery<UserDataResponse>({
      queryKey: ['user'],
      queryFn: async () => await getUser(Number(id)),
      enabled: !newUser,
    });
  // mutations
  const { mutateAsync: createUserMutation, isPending: isLoadingCreateUser } =
    useMutation({
      mutationFn: async (newUser: IUser) => await createUser(newUser),
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          toastSuccess(USER_CREATED_SUCCESSFULLY);
          navigate('/users');
        }
      },
      onError: () => toastError(ERROR_CREATING_USER),
    });
  const { mutateAsync: updateUserMutation, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: async (values: IUser) => await updateUser(Number(id), values),
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          toastSuccess(USER_UPDATED_SUCCESSFULLY);
          navigate('/users');
        }
      },
      onError: () => toastError(ERROR_UPDATING_USER),
    });
  const { mutateAsync: uploadFileMutation, isPending: isLoadingFileUpload } =
    useMutation({
      mutationFn: uploadFile,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
      onError: () => toastError(ERROR_PROCESSING_IMAGE),
    });

  const isUpdatingItself = !newUser && user?.id === currentUser.id;

  // hook form
  const methods = useForm<UserDataSchemaType>({
    resolver: userDataSchema as any,
    shouldUnregister: false,
  });

  const { handleSubmit, reset } = methods;

  // memos
  const loading = React.useMemo(
    () =>
      isLoadingGetUser ||
      isLoadingFileUpload ||
      isLoadingCreateUser ||
      isLoadingUpdateUser,
    [
      isLoadingGetUser,
      isLoadingCreateUser,
      isLoadingUpdateUser,
      isLoadingFileUpload,
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
    async (values: IUser) => {
      const formElement = document.querySelector(
        '#form-user',
      ) as HTMLFormElement;

      let uploadedImageUrl = null;

      const isValidImageUrl =
        values.image_url !== null &&
        values.image_url !== undefined &&
        values.image_url !== user?.image_url;

      if (isValidImageUrl && formElement) {
        const imageUrl = await handleFileUpload(formElement);
        uploadedImageUrl = imageUrl;
      }

      const savedValues = {
        ...values,
        image_url: uploadedImageUrl || values.image_url,
      };

      if (newUser) {
        await createUserMutation(savedValues);
      } else {
        await updateUserMutation(savedValues);
      }
    },
    [
      createUserMutation,
      handleFileUpload,
      newUser,
      updateUserMutation,
      user?.image_url,
    ],
  );

  React.useEffect(() => {
    if (!loading) {
      if (newUser) {
        reset();
        setImageUrl(undefined);
        setName('');
      } else if (user) {
        reset(user);
        setImageUrl(user.image_url);
        setName(user.name);
      }
    }
  }, [loading, newUser, reset, setImageUrl, setName, user]);

  return {
    user,
    currentUser,
    newUser,
    isUpdatingItself,
    methods,
    submit,
    handleSubmit,
    loading,
    goBack,
  };
};
