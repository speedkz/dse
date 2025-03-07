import { Box, BoxProps, Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  labelFloating?: boolean;
  labelInner?: boolean;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

interface ContainerProps extends BoxProps {
  labelInner?: boolean;
}
const Container = (props: ContainerProps) => {
  const { children } = props;
  return <Box className="container">{children}</Box>;
};

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props;

    return (
      <ChakraField.Root ref={ref} {...rest}>
        <Container>
          {children}
          {label && (
            <ChakraField.Label>
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
