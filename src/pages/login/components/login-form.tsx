import Logo from "@/assets/logos/LogoText.svg?react";
import { toaster } from "@/components/ui/toaster";
import validator from "@/helpers/validation";
import { useFormControl } from "@/hooks";
import { authService } from "@/services";
import { Button, Card, Stack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { LuEye, LuLock, LuUser } from "react-icons/lu";

interface FormProps {
  email: string;
  pwd: string;
}
export const LoginForm = () => {
  const useFormReturn = useForm<FormProps>({
    defaultValues: {
      email: "",
      pwd: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = useFormReturn;

  const { InputGroupControl, InputPasswordControl } = useFormControl({
    useFormReturn,
  });

  const onSubmit = async (values: FormProps) => {
    try {
      const { email, pwd } = values;
      await authService.login(email, pwd);
      toaster.create({
        title: "Toast Title",
        type: "success",
      });
    } catch (err) {
      const { message, code } = err as AxiosError;
      toaster.create({
        title: code,
        description: message,
        type: "error",
      });
    }
  };

  return (
    <Card.Root w={420}>
      <Card.Header alignItems={"center"}>
        <Logo />
      </Card.Header>

      <Card.Body>
        <Stack gap={5}>
          <InputGroupControl
            name="email"
            fieldProps={{
              required: true,
            }}
            inputGroupProps={{
              startElement: <LuUser />,
            }}
            inputProps={{
              placeholder: "Enter Email address",
              "data-testid": "email",
            }}
            rules={{
              required: "Required field",
              validate: (value) =>
                validator.validateEmail(value, "Invalid email"),
            }}
          />

          <InputPasswordControl
            name="pwd"
            fieldProps={{
              required: true,
            }}
            inputGroupProps={{
              startElement: <LuLock />,
              endElement: <LuEye />,
            }}
            inputProps={{
              placeholder: "Enter Password",
              "data-testid": "pwd",
            }}
            rules={{
              required: "Required field",
              validate: (value) =>
                validator.validatePassword(value, "Invalid password"),
            }}
          />

          <Button
            data-testid="submit"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            Log in
          </Button>
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent={"center"}>
        <Button color={"primary.400"} variant={"ghost"}>
          Forgot password
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
