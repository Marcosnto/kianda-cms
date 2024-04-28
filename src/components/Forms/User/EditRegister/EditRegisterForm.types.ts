import { Dispatch, SetStateAction } from "react";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { RegisterProps } from "../../../../utils/types/forms";

export type EditRegisterFormTypes = {
  userName: string;
  currentValues: Partial<RegisterProps>;
  register: UseFormRegister<RegisterProps>;
  onSubmit: SubmitHandler<RegisterProps>;
  handleSubmit: UseFormHandleSubmit<RegisterProps, undefined>;
  control: Control<Partial<RegisterProps>, any>;
  errors: FieldErrors<RegisterProps>;
  isSubmitting: boolean;
  sendEmail: boolean;
  setSendEmail: Dispatch<SetStateAction<boolean>>;
  disabledRoleChange: boolean;
  canChangeRole: boolean;
};

export type UpdateRegister = Partial<RegisterProps> & {
  id?: number | string | undefined;
  sendEmail: boolean;
};
