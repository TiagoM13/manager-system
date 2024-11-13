import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import {
  House,
  CheckSquare,
  IdentificationBadge,
  Plus,
} from '@phosphor-icons/react';

import {
  Button,
  Card,
  CustomLoadingSkeleton,
  Header,
  StatusIcon,
  FormContainer,
} from '@/components';
import { Status } from '@/enums';
import { useAppNavigation, useQueryParams } from '@/hooks';
import { HttpClient } from '@/infra/http/http-client';
import { IAppointment } from '@/interfaces';
import { PatientHeader } from '@/pages/patients/patient-details/components';
import {
  createAppointmentService,
  getAllPatientsService,
  getPatientService,
  getAllDoctorsService,
} from '@/services';
import { toastSuccess } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  appointmentFormResolver,
  AppointmentFormType,
  patientSearchResolver,
  PatientSearchType,
} from '../appointment-form.schema';
import { PatientCard } from '../components/patient-card';
import { AppointmentCardForm } from '../forms/appointment-form';
import { PatientSearchForm } from '../forms/patient-search-form';

const AppointmentForm: React.FC = () => {
  const http = new HttpClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { goBack, navigateTo } = useAppNavigation();
  const { patientId } = useParams<{ patientId: string }>();
  const [query] = useQueryParams<PatientSearchType>();

  const isCreatingNewAppointment = React.useMemo(
    () => patientId === 'new',
    [patientId],
  );

  const { data: allPatients, isLoading: isLoadingAllPatients } = useQuery({
    queryKey: ['patients', query.name],
    queryFn: async () => {
      if (!query.name) return null;
      return await getAllPatientsService(http, { name: String(query.name) });
    },
    enabled: !!query.name,
  });
  const { data: patient, isLoading: isLoadingPatient } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => await getPatientService(http, String(patientId)),
    enabled: !isCreatingNewAppointment,
  });
  const { data, isLoading: isLoadingDoctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await getAllDoctorsService(http, {}),
  });
  const { mutateAsync: createAppointmentMutation, isPending } = useMutation({
    mutationFn: async (values: IAppointment) =>
      await createAppointmentService(http, String(patientId), values),
    onSuccess: (data) => {
      if (data) {
        navigate('/appointments');
        toastSuccess('Nova consulta adicionada com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['appointments'] });
      }
    },
  });

  // Forms
  const methods = useForm<AppointmentFormType>({
    resolver: appointmentFormResolver,
    shouldUnregister: false,
    defaultValues: {
      scheduled_date: dayjs().format('YYYY-MM-DD') as any,
    },
  });
  const { handleSubmit } = methods;
  const serachFormMethods = useForm<PatientSearchType>({
    resolver: patientSearchResolver,
    shouldUnregister: false,
  });

  const breadcrumbsPathItems = React.useMemo(
    () => [
      {
        label: 'Início',
        path: '/',
        icon: <House className="size-4" />,
      },
      {
        label: 'Consultas',
        path: '/appointments',
        icon: <CheckSquare className="size-4" />,
      },
      {
        label: isCreatingNewAppointment ? (
          'Cadastrar'
        ) : isLoadingPatient ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          `${patient?.name}`
        ),
        icon: <IdentificationBadge className="size-4" />,
      },
    ],
    [isCreatingNewAppointment, isLoadingPatient, patient],
  );

  const loading = React.useMemo(
    () => isLoadingDoctors || isLoadingPatient,
    [isLoadingPatient, isLoadingDoctors],
  );

  const doctorOptions = React.useMemo(
    () =>
      data?.doctors
        .filter((doctor) => doctor.status !== Status.INACTIVE)
        .map((doctor) => ({
          label: doctor.name,
          value: doctor.id,
        })),
    [data?.doctors],
  );

  const submit = React.useCallback(
    async (values: AppointmentFormType) => {
      const selectedDate = dayjs(values.scheduled_date).utc();

      const combinedDateTime = selectedDate
        .hour(dayjs().hour())
        .minute(dayjs().minute())
        .second(dayjs().second())
        .millisecond(dayjs().millisecond())
        .toISOString();

      console.log({ combinedDateTime });

      const payload: IAppointment = {
        ...values,
        scheduled_date: combinedDateTime as any,
      };
      console.log({ payload });

      await createAppointmentMutation(payload);
    },
    [createAppointmentMutation],
  );

  return (
    <FormContainer>
      <Header
        subtitle="voltar para lista de consultas"
        title="Adicionar Consulta"
        breadcrumbItems={breadcrumbsPathItems}
        goBack={() => goBack('/appointments')}
      />

      <div className="max-w-[1440px] mt-6 space-y-6">
        {isCreatingNewAppointment && (
          <FormProvider {...serachFormMethods}>
            <PatientSearchForm loading={loading} />
          </FormProvider>
        )}

        {query.name && allPatients && (
          <Card bordered>
            <div className="space-y-4 p-2">
              {allPatients.patients.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold">
                    Pacientes Encontrados
                  </h2>
                  {allPatients.patients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <span className="text-sm">
                    Nenhum paciente corresponde à sua pesquisa.
                  </span>
                  <span className="text-sm">
                    Verifique as informações e tente novamente, ou adicione um
                    novo paciente.
                  </span>
                  <Button
                    type="button"
                    label="adicionar novo paciente"
                    icon={<Plus className="size-4" weight="bold" />}
                    onClick={() => navigateTo({ route: '/patients/new' })}
                  />
                </div>
              )}
            </div>
          </Card>
        )}

        {!isCreatingNewAppointment && (
          <Card>
            <PatientHeader patient={patient} loading={loading} />
          </Card>
        )}

        {!isCreatingNewAppointment && (
          <FormProvider {...methods}>
            <div className="max-w-[1440px]">
              <Card bordered>
                <div className="flex gap-6 p-2">
                  <div className="w-full flex flex-col justify-between">
                    <AppointmentCardForm
                      loading={loading}
                      doctors={doctorOptions as any}
                    />

                    <div className="flex ml-auto gap-2 p-2">
                      <Button
                        type="button"
                        label="salvar consulta"
                        onClick={handleSubmit(submit)}
                        icon={<StatusIcon loading={isPending} />}
                        className="min-w-28 justify-between px-4"
                        disabled={isPending}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </FormProvider>
        )}
      </div>
    </FormContainer>
  );
};

export default AppointmentForm;
