import { doctor } from '@/__mocks__/doctor';
import { IDoctor } from '@/interfaces';

interface UseDoctorReturn {
  doctor: IDoctor | undefined;
  loading: boolean;
}

export const useDoctor = (): UseDoctorReturn => {
  return {
    doctor: doctor,
    loading: false,
  };
};

export const useGetAllDoctor = () => {
  return {};
};
