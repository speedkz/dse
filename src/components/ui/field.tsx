import { Box, Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  labelFloating?: boolean;
  labelInner?: boolean;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const {
      label,
      children,
      helperText,
      errorText,
      optionalText,
      labelFloating,
      labelInner = true,
      ...rest
    } = props;

    const Container = labelInner ? Box : React.Fragment;

    return (
      <ChakraField.Root ref={ref} {...rest}>
        <Container className="inner-label">
          {children}
          {label && (
            <ChakraField.Label className={labelFloating ? "float" : ""}>
              {label}
              <ChakraField.RequiredIndicator fallback={optionalText} />
            </ChakraField.Label>
          )}
        </Container>
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);
