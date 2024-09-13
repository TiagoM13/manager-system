import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, Divider, FormContainer, Header } from '@/components';
import { useWindowSize } from '@/hooks';

import { PatientsTable } from '../components/patients-table';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, , isMobile] = useWindowSize();

  const handleNewRegister = React.useCallback(() => {
    navigate('/patients/new', {
      state: { from: location },
    });
  }, [location, navigate]);

  return (
    <FormContainer>
      <div className="flex flex-col">
        <Header
          title="Pacientes"
          labelAction="cadastrar paciente"
          newRegister={handleNewRegister}
        />

        <Divider />

        <Card>{isMobile ? <div></div> : <PatientsTable />}</Card>
      </div>
    </FormContainer>
  );
};

export default Patients;
