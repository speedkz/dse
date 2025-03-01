import Logo from "@/assets/logos/LogoText.svg?react";
import { useFormControl } from "@/hooks";
import { Button, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuEye, LuLock, LuUser } from "react-icons/lu";

interface FormProps {
  email: string;
  password: string;
}
export const LoginForm = () => {
  const useFormReturn = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = useFormReturn;

  const { InputGroupControl, InputPasswordControl } = useFormControl({
    useFormReturn,
  });

  const onSubmit = (values: FormProps) => {
    alert(JSON.stringify(values));
  };

  return (
    <Card.Root w={420}>
      <Card.Header alignItems={"center"}>
        <Logo />
      </Card.Header>
      <Card.Body>
        <InputGroupControl
          name="email"
          inputGroupProps={{
            startElement: <LuUser />,
          }}
          inputProps={{
            placeholder: "Enter Email address",
          }}
        />
        <InputPasswordControl
          name="password"
          inputGroupProps={{
            startElement: <LuLock />,
            endElement: <LuEye />,
          }}
          inputProps={{
            placeholder: "Enter Password",
          }}
        />

        <Button onClick={handleSubmit(onSubmit)}>Log in</Button>
      </Card.Body>
      <Card.Footer justifyContent={"center"}>
        <Button color={"primary.400"} variant={"ghost"}>
          Forgot password
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
