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
  userName?: string;
  currentValues: Partial<RegisterProps>;
  register: UseFormRegister<Partial<RegisterProps>>;
  onSubmit: SubmitHandler<Partial<RegisterProps>>;
  handleSubmit: UseFormHandleSubmit<Partial<RegisterProps>>;
  control: Control<Partial<RegisterProps>, any>;
  errors: FieldErrors<RegisterProps>;
  isSubmitting: boolean;
  isToSendEmail: boolean;
  setIsToSendEmail: Dispatch<SetStateAction<boolean>>;
  disabledRoleChange?: boolean;
  canChangeRole?: boolean;
};

export type UpdateRegister = Partial<RegisterProps> & {
  id?: number | string | undefined;
};
