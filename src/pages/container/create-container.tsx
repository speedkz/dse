import { PageContainer } from "@/components/template";
import { Button } from "@/components/ui";
import { useFormControl } from "@/hooks";
import { containerService, IContainer } from "@/services";
import { Card, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormProps extends IContainer {}

export const CreateContainer = () => {
  const useFormReturn = useForm<FormProps>({
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = useFormReturn;

  const { InputControl } = useFormControl({
    useFormReturn,
  });

  const onSubmit = (values: FormProps) => {
    containerService.create(values);
  };
  return (
    <PageContainer>
      <Card.Root w={650} alignSelf={"center"}>
        <Card.Header alignItems={"center"}>
          <Text textStyle={"h3"} color={"neutral.600"}>
            Add new container
          </Text>
        </Card.Header>

        <Card.Body>
          <Stack gap={5}>
            <InputControl
              name="name"
              fieldProps={{
                required: true,
                label: "Container name",
              }}
              inputProps={{
                placeholder: "Container name",
                "data-testid": "name",
              }}
              rules={{
                required: "Required field",
              }}
            />

            <InputControl
              name="type"
              fieldProps={{
                required: true,
                label: "Container type",
              }}
              inputProps={{
                placeholder: "Container type",
                "data-testid": "type",
              }}
              rules={{
                required: "Required field",
              }}
            />

            <InputControl
              name="weight"
              fieldProps={{
                required: true,
                label: "Weight (kg)",
              }}
              inputProps={{
                placeholder: "Weight (kg)",
                "data-testid": "weight",
              }}
              rules={{
                required: "Required field",
              }}
            />

            <InputControl
              name="capacity"
              fieldProps={{
                label: "Capacity (m3)",
              }}
              inputProps={{
                placeholder: "Capacity (m3)",
                "data-testid": "capacity",
              }}
            />
          </Stack>
        </Card.Body>

        <Card.Footer justifyContent={"center"}>
          <Button w={"180px"} variant={"outline"}>
            Cancel
          </Button>

          <Button
            w={"180px"}
            data-testid="submit"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Card.Footer>
      </Card.Root>
    </PageContainer>
  );
};
