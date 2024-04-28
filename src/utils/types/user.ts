export type UserProps = {
  id: number;
  fullName: string;
  email: string;
  borDate?: string | Date;
  rg?: string;
  cpf?: string;
  gender?: string;
  otherGender?: string;
  registerStatus?: string;
  disabledPerson?: string;
  disabledPersonDescription?: string;
  terapheuticContractComplete?: string;
  role?: string;
};

export type terapheuticContractList = {
  id: number;
  type: number;
  name: string;
  fullName: string;
  email: string;
  status: string;
};
