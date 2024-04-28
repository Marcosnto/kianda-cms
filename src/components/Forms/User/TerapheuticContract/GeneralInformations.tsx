import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import RequiredInput from "../../components/RequiredInput";
import { FormReactHooksProps } from "@/utils/types/forms";
import schoolingTypes from "@/utils/mocks/inputOptions/schoolingTypes";
import pronounsTypes from "@/utils/mocks/inputOptions/pronounsTypes";
import civilStatus from "@/utils/mocks/inputOptions/civilStatus";

export default function GeneralInformations({
  errors,
  register,
  watch,
}: FormReactHooksProps) {
  const watched = watch([
    "gender",
    "disabledPerson",
    "needSuitability",
    "childrens",
  ]);

  return (
    <>
      <Heading as="h2" size="md">
        Informações Gerais
      </Heading>
      <Divider />
      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.fullName}>
          <FormLabel htmlFor="fullName">
            Nome Completo <RequiredInput />
          </FormLabel>

          <Input
            id="fullName"
            type="text"
            {...register("fullName", {
              required: "Esse Campo é obrigatório",
            })}
            focusBorderColor="green.800"
          />

          <FormErrorMessage>
            {errors.fullName && errors.fullName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.bornDate}>
          <FormLabel htmlFor="bornDate">
            Data de Nascimento <RequiredInput />
          </FormLabel>
          <Input
            id="bornDate"
            type="text"
            {...register("bornDate", {
              required: "Esse Campo é obrigatório",
              pattern: {
                value: /(^\d{2})\/(1[0-2]|0[1-9])\/(\d{4})$/,
                message: "Data deve respeitar o formato: dd/mm/aaaa",
              },
            })}
            focusBorderColor="green.800"
          />

          <FormErrorMessage>
            {errors.bornDate && errors.bornDate.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.rg}>
          <FormLabel htmlFor="rg">
            RG <RequiredInput />
          </FormLabel>
          <Input
            id="rg"
            type="number"
            {...register("rg", {
              required: "Esse Campo é obrigatório",
              pattern: {
                value: /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/,
                message: "RG Incorreto",
              },
            })}
            focusBorderColor="green.800"
          />
          <FormErrorMessage>{errors.rg && errors.rg.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.cpf}>
          <FormLabel htmlFor="cpf">
            CPF <RequiredInput />
          </FormLabel>
          <Input
            id="cpf"
            type="number"
            {...register("cpf", {
              required: "Esse Campo é obrigatório",
              pattern: {
                value: /(^\d{3}).?(\d{3}).?(\d{3})-?(\d{2})$/,
                message: "CPF Incorreto",
              },
            })}
            focusBorderColor="green.800"
          />
          <FormErrorMessage>
            {errors.cpf && errors.cpf.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">
            E-mail <RequiredInput />
          </FormLabel>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Esse Campo é obrigatório",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Formato de email incorreto",
              },
            })}
            focusBorderColor="green.800"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.contact}>
          <FormLabel htmlFor="contact">
            Telefone (com DDD) <RequiredInput />
          </FormLabel>
          <NumberInput>
            <NumberInputField
              id="contact"
              {...register("contact", {
                required: "Esse Campo é obrigatório",
                pattern: {
                  value: /^\(?\d{2}\)?\d{1}\d{4}\d{4}$/,
                  message: "Telefone no formato incorreto",
                },
              })}
            />
          </NumberInput>

          <FormErrorMessage>
            {errors.contact && errors.contact.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <FormControl isInvalid={!!errors.address}>
        <FormLabel htmlFor="address">
          Endereço <RequiredInput />
        </FormLabel>
        <Input
          id="address"
          type="text"
          {...register("address", {
            required: "Esse Campo é obrigatório",
          })}
          focusBorderColor="green.800"
        />
        <FormErrorMessage>
          {errors.address && errors.address.message}
        </FormErrorMessage>
      </FormControl>

      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.schooling}>
          <FormLabel htmlFor="schooling">
            Escolaridade <RequiredInput />
          </FormLabel>
          <Select
            id="schooling"
            placeholder="Escolha uma opção"
            {...register("schooling", {
              required: "Esse Campo é obrigatório",
            })}
            colorScheme="green"
          >
            {schoolingTypes.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.schooling && errors.schooling.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.profession}>
          <FormLabel htmlFor="profession">
            Profissão <RequiredInput />
          </FormLabel>
          <Input
            id="profession"
            type="text"
            {...register("profession", {
              required: "Esse Campo é obrigatório",
            })}
            focusBorderColor="green.800"
          />
          <FormErrorMessage>
            {errors.profession && errors.profession.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.ethnicity}>
          <FormLabel htmlFor="ethnicity">
            Cor ou Raça/Etnia <RequiredInput />
          </FormLabel>
          <Input
            id="ethnicity"
            type="text"
            {...register("ethnicity", {
              required: "Esse Campo é obrigatório",
            })}
            focusBorderColor="green.800"
          />
          <FormErrorMessage>
            {errors.ethnicity && errors.ethnicity.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.sexualOrientation}>
          <FormLabel htmlFor="sexualOrientation">
            Orientação sexual <RequiredInput />
          </FormLabel>
          <Input
            id="sexualOrientation"
            type="text"
            {...register("sexualOrientation", {
              required: "Esse Campo é obrigatório",
            })}
            focusBorderColor="green.800"
          />
          <FormErrorMessage>
            {errors.sexualOrientation && errors.sexualOrientation.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.pronouns}>
          <FormLabel htmlFor="pronouns">
            Pronomes <RequiredInput />
          </FormLabel>

          <Select
            id="pronouns"
            placeholder="Selecione uma opção"
            defaultValue={0}
            {...register("pronouns", {
              required: "Esse Campo é obrigatório",
            })}
            colorScheme="green"
          >
            {pronounsTypes.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.pronouns && errors.pronouns.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">
            Gênero <RequiredInput />
          </FormLabel>
          <RadioGroup id="gender" colorScheme="green">
            <Stack direction="row">
              <Radio
                value="1"
                {...register("gender", {
                  required: "Esse Campo é obrigatório",
                })}
              >
                Cis
              </Radio>
              <Radio
                value="2"
                {...register("gender", {
                  required: "Esse Campo é obrigatório",
                })}
              >
                Trans
              </Radio>
              <Radio
                value="3"
                {...register("gender", {
                  required: "Esse Campo é obrigatório",
                })}
              >
                Outro
              </Radio>
            </Stack>
          </RadioGroup>

          <FormErrorMessage>
            {errors.gender && errors.gender.message}
          </FormErrorMessage>
        </FormControl>

        {watched[0] === "3" ? (
          <FormControl isInvalid={!!errors.otherGender}>
            <FormLabel htmlFor="otherGender">
              Informe o gênero <RequiredInput />:
            </FormLabel>
            <Input
              id="otherGender"
              type="text"
              {...register("otherGender", {
                required: "Esse Campo é obrigatório",
              })}
              focusBorderColor="green.800"
            />

            <FormErrorMessage>
              {errors.otherGender && errors.otherGender.message}
            </FormErrorMessage>
          </FormControl>
        ) : null}
      </Stack>

      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.civilStatus}>
          <FormLabel htmlFor="civilStatus">
            Estado Civil <RequiredInput />
          </FormLabel>
          <Select
            id="civilStatus"
            placeholder="Selecione uma opção"
            defaultValue={0}
            {...register("civilStatus", {
              required: "Esse Campo é obrigatório",
            })}
            colorScheme="green"
          >
            {civilStatus.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.civilStatus && errors.civilStatus.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.childrens}>
          <FormLabel htmlFor="childrens">
            Filho/a/e(s) <RequiredInput />
          </FormLabel>
          <RadioGroup id="childrens" colorScheme="green">
            <Stack direction="row">
              <Radio
                value="true"
                {...register("childrens", {
                  required: "Esse Campo é obrigatório",
                })}
              >
                Sim
              </Radio>
              <Radio
                value="false"
                {...register("childrens", {
                  required: "Esse Campo é obrigatório",
                })}
              >
                Não
              </Radio>
            </Stack>
          </RadioGroup>

          <FormErrorMessage>
            {errors.childrens && errors.childrens.message}
          </FormErrorMessage>
        </FormControl>

        {watched[3] === "true" ? (
          <FormControl isInvalid={!!errors.childrenQuantity}>
            <FormLabel htmlFor="childrenQuantity">
              Informe a quantidade de filhos: <RequiredInput />
            </FormLabel>
            <NumberInput>
              <NumberInputField
                id="childrenQuantity"
                {...register("childrenQuantity", {
                  required: "Esse Campo é obrigatório",
                })}
              />
            </NumberInput>

            <FormErrorMessage>
              {errors.childrenQuantity && errors.childrenQuantity.message}
            </FormErrorMessage>
          </FormControl>
        ) : null}
      </Stack>

      <FormControl isInvalid={!!errors.religion}>
        <FormLabel htmlFor="religion">
          Religião <RequiredInput />
        </FormLabel>
        <Input
          id="religion"
          type="text"
          {...register("religion", {
            required: "Esse Campo é obrigatório",
          })}
          focusBorderColor="green.800"
        />
        <FormErrorMessage>
          {errors.religion && errors.religion.message}
        </FormErrorMessage>
      </FormControl>

      <Stack spacing={8} direction="row">
        <FormControl isInvalid={!!errors.disabledPerson}>
          <FormLabel htmlFor="disabledPerson">
            É uma pessoa com deficiência? <RequiredInput />
          </FormLabel>
          <RadioGroup id="disabledPerson" colorScheme="green">
            <Stack direction="row">
              <Radio
                value="true"
                {...register("disabledPerson", {
                  required: "Esse Campo é obrigatório",
                })}
              >
                Sim
              </Radio>
              <Radio
                value="false"
                {...register("disabledPerson", {
                  required: "Esse Campo é obrigatório",
                })}
              >
                Não
              </Radio>
            </Stack>
          </RadioGroup>

          <FormErrorMessage>
            {errors.disabledPerson && errors.disabledPerson.message}
          </FormErrorMessage>
        </FormControl>

        {watched[1] === "true" ? (
          <>
            <FormControl isInvalid={!!errors.disabledPersonDescription}>
              <FormLabel htmlFor="disabledPersonDescription">
                Informe a deficiência: <RequiredInput />:
              </FormLabel>
              <Input
                id="disabledPersonDescription"
                type="text"
                {...register("disabledPersonDescription", {
                  required: "Esse Campo é obrigatório",
                })}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.disabledPersonDescription &&
                  errors.disabledPersonDescription.message}
              </FormErrorMessage>
            </FormControl>
          </>
        ) : null}
      </Stack>

      {watched[1] === "true" ? (
        <>
          <FormControl isInvalid={!!errors.needSuitability}>
            <FormLabel htmlFor="needSuitability">
              Precisa de adequações quanto a infraestrutura online?{" "}
              <RequiredInput />
            </FormLabel>
            <RadioGroup id="needSuitability" colorScheme="green">
              <Stack direction="row">
                <Radio
                  value="true"
                  {...register("needSuitability", {
                    required: "Esse Campo é obrigatório",
                  })}
                >
                  Sim
                </Radio>
                <Radio
                  value="false"
                  {...register("needSuitability", {
                    required: "Esse Campo é obrigatório",
                  })}
                >
                  Não
                </Radio>
              </Stack>
            </RadioGroup>

            <FormErrorMessage>
              {errors.needSuitability && errors.needSuitability.message}
            </FormErrorMessage>
          </FormControl>

          {watched[2] === "true" ? (
            <FormControl isInvalid={!!errors.suitabilityDescription}>
              <FormLabel htmlFor="suitabilityDescription">
                Informe a adequação: <RequiredInput />:
              </FormLabel>
              <Input
                id="suitabilityDescription"
                type="text"
                {...register("suitabilityDescription", {
                  required: "Esse Campo é obrigatório",
                })}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.suitabilityDescription &&
                  errors.suitabilityDescription.message}
              </FormErrorMessage>
            </FormControl>
          ) : null}
        </>
      ) : null}
    </>
  );
}
