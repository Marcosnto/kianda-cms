import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordInput({
  register,
  id,
  objectRule,
  showPassword,
  setShowPassword,
}: {
  id: string;
  objectRule?: { [key: string]: any };
  register: UseFormRegister<any>;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <InputGroup size="md">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        {...register(id, { ...objectRule })}
        focusBorderColor="green.800"
      />
      <InputRightElement>
        <Button
          variant="ghost"
          colorScheme="green"
          size="2xl"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={18} />
          ) : (
            <AiOutlineEye fontSize={18} />
          )}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
