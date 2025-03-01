import { Field, InputGroup, InputGroupProps } from "@/components/ui";
import { IconButton, Input, InputProps } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, ControllerProps, UseFormReturn } from "react-hook-form";

export interface UseFormControlProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<T & any>;
}
export interface ElementControlProps extends Pick<ControllerProps, "name"> {
  inputProps?: InputProps;
  inputGroupProps?: Omit<InputGroupProps, "children">;
}
export const useFormControl = <T,>(props: UseFormControlProps<T>) => {
  const { useFormReturn } = props;
  const { control } = useFormReturn;

  const InputPasswordControl = (props: ElementControlProps) => {
    const [inputType, setInputType] = useState<"password" | "text">("password");
    const { inputProps, inputGroupProps, ...rest } = props;
    return (
      <Controller
        {...rest}
        control={control}
        render={({ field }) => (
          <Field labelInner={false}>
            <InputGroup
              {...inputGroupProps}
              endElement={
                <IconButton
                  variant={"ghost"}
                  onClick={() =>
                    setInputType(inputType === "password" ? "text" : "password")
                  }
                >
                  {inputGroupProps?.endElement}
                </IconButton>
              }
            >
              <Input type={inputType} {...field} {...inputProps} />
            </InputGroup>
          </Field>
        )}
      />
    );
  };

  const InputControl = (props: ElementControlProps) => {
    const { inputProps, ...rest } = props;
    return (
      <Controller
        {...rest}
        control={control}
        render={({ field }) => (
          <Field labelInner={false}>
            <Input {...field} {...inputProps} />
          </Field>
        )}
      />
    );
  };

  const InputGroupControl = (props: ElementControlProps) => {
    const { inputProps, inputGroupProps, ...rest } = props;
    return (
      <Controller
        control={control}
        {...rest}
        render={({ field }) => (
          <Field labelInner={false}>
            <InputGroup {...inputGroupProps}>
              <Input {...field} {...inputProps} />
            </InputGroup>
          </Field>
        )}
      />
    );
  };
  return {
    InputControl,
    InputGroupControl,
    InputPasswordControl,
  };
};
