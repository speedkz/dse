import { Textarea as ChakraTextare, TextareaProps } from "@chakra-ui/react";
import React from "react";

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    return <ChakraTextare ref={ref} {...props} />;
  }
);
