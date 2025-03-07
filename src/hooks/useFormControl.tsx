/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Field,
  FieldProps,
  InputGroup,
  InputGroupProps,
} from "@/components/ui";
import { IconButton, Input, InputProps } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, ControllerProps, UseFormReturn } from "react-hook-form";

type DataAttributeKey = `data-${string}`;

interface HTMLAttributes extends React.HTMLAttributes<any> {
  [dataAttribute: DataAttributeKey]: any;
}

export interface UseFormControlProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<T & any>;
}
export interface ElementControlProps extends Omit<ControllerProps, "render"> {
  inputProps?: InputProps & HTMLAttributes;
  inputGroupProps?: Omit<InputGroupProps, "children"> & HTMLAttributes;
  fieldProps?: FieldProps;
}
export const useFormControl = <T,>(props: UseFormControlProps<T>) => {
  const { useFormReturn } = props;
  const { control } = useFormReturn;

  const InputPasswordControl = (props: ElementControlProps) => {
    const [inputType, setInputType] = useState<"password" | "text">("password");
    const { inputProps, inputGroupProps, fieldProps, ...rest } = props;
    return (
      <Controller
        {...rest}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Field {...fieldProps} errorText={error?.message}>
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
    const { inputProps, fieldProps, ...rest } = props;
    return (
      <Controller
        {...rest}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Field {...fieldProps} errorText={error?.message}>
            <Input {...field} {...inputProps} />
          </Field>
        )}
      />
    );
  };

  const InputGroupControl = (props: ElementControlProps) => {
    const { inputProps, fieldProps, inputGroupProps, ...rest } = props;
    return (
      <Controller
        control={control}
        {...rest}
        render={({ field, fieldState: { invalid, error } }) => {
          return (
            <Field {...fieldProps} invalid={invalid} errorText={error?.message}>
              <InputGroup {...inputGroupProps}>
                <Input {...field} {...inputProps} />
              </InputGroup>
            </Field>
          );
        }}
      />
    );
  };

  return {
    InputControl,
    InputGroupControl,
    InputPasswordControl,
  };
};
