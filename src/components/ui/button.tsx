import type { ButtonProps } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";
import * as React from "react";
import { LuX } from "react-icons/lu";


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return (
      <ChakraButton ref={ref} {...props}>
        {props.children ?? <LuX />}
      </ChakraButton>
    );
  }
);
