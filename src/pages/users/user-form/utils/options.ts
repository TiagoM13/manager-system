import { Role } from '@/shared/enums';

export const ROLE_LABELS = {
  ADMIN: 'Administrador',
  EDITOR: 'Editor',
  CLINICAL: 'Clínico',
};

export const roleOptions = [
  { value: Role.ADMIN, label: ROLE_LABELS[Role.ADMIN] },
  { value: Role.EDITOR, label: ROLE_LABELS[Role.EDITOR] },
  { value: Role.CLINICAL, label: ROLE_LABELS[Role.CLINICAL] },
];
