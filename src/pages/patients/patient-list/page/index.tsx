import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, Divider, FormContainer, Header } from '@/components';
import { useQuery, useWindowSize } from '@/hooks';
import { IPatientFilters } from '@/interfaces';

import { PatientFilters } from '../components/patient-filters';
import { PatientsTable } from '../components/patients-table';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, , isMobile] = useWindowSize();

  const [query, setQuery] = useQuery<IPatientFilters>();

  // Hook Form
  const methods = useForm({
    defaultValues: query,
    mode: 'onChange',
    shouldUnregister: false,
  });

  const handleNewRegister = React.useCallback(() => {
    navigate('/patients/new', {
      state: { from: location },
    });
  }, [location, navigate]);

  return (
    <FormContainer {...methods}>
      <div className="flex flex-col">
        <Header
          title="Pacientes"
          labelAction="cadastrar paciente"
          newRegister={handleNewRegister}
        />

        <Divider />

        <Card>
          <PatientFilters />

          {isMobile ? <div></div> : <PatientsTable />}
        </Card>
      </div>
    </FormContainer>
  );
};

export default Patients;
