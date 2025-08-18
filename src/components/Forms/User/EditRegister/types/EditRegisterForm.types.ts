import { RegisterProps } from "@/utils/types/forms";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export type EditRegisterFormTypes = {
  userName?: string;
  avatar?: string;
  currentValues: Partial<RegisterProps>;
  register: UseFormRegister<Partial<RegisterProps>>;
  onSubmit: SubmitHandler<Partial<RegisterProps>>;
  handleSubmit: UseFormHandleSubmit<Partial<RegisterProps>>;
  control: Control<Partial<RegisterProps>, any>;
  getValues?: UseFormGetValues<Partial<RegisterProps>>;
  watch?: UseFormWatch<Partial<RegisterProps>>;
  errors: FieldErrors<RegisterProps>;
  isSubmitting: boolean;
  isToSendEmail: boolean;
  disabledRoleChange?: boolean;
  canChangeRole?: boolean;
  setIsOpenDeleteModal?: (isOpen: boolean) => void;
};

export type UpdateRegister = Partial<RegisterProps> & {
  id?: number | string | undefined;
};

export type LoggedUserType = {
  id: number;
  role: string;
  name: string;
};
