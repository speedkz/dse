import { Button } from "@/components/ui";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DialogContentProps,
  DialogRootProps,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

import DoneIcon from "@/assets/icons/popup/done.svg?react";
import ErrorIcon from "@/assets/icons/popup/error.svg?react";
import WarningIcon from "@/assets/icons/popup/warning.svg?react";

interface DialogMessageProps extends Omit<DialogRootProps, "children"> {
  contentProps?: DialogContentProps;
  title?: string;
  body?: ReactNode;
  message?: ReactNode;
  footer?: ReactNode;
  triggerElement?: ReactNode;
  setOpen: (value: boolean) => void;
}

export const DialogMessage = React.forwardRef<
  HTMLDivElement,
  DialogMessageProps
>(function DialogMessage(props, ref) {
  const { title, body, footer, triggerElement, contentProps, ...rest } = props;
  return (
    <DialogRoot {...rest}>
      <DialogBackdrop />
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent ref={ref} {...contentProps}>
        <DialogCloseTrigger></DialogCloseTrigger>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{body}</DialogBody> <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
});

export const DialogSuccess = (props: DialogMessageProps) => {
  const { message, ...rest } = props;
  const { setOpen } = rest;
  return (
    <DialogMessage
      {...rest}
      contentProps={{ width: "420px" }}
      body={
        <Stack alignItems={"center"}>
          <DoneIcon />
          <Text textStyle={"h3"}>{message}</Text>
        </Stack>
      }
      footer={
        <Button width={"100%"} onClick={() => setOpen(false)}>
          OK
        </Button>
      }
    />
  );
};

export const DialogError = (props: DialogMessageProps) => {
  const { message, ...rest } = props;
  const { setOpen } = rest;
  return (
    <DialogMessage
      {...rest}
      contentProps={{ width: "420px" }}
      body={
        <Stack alignItems={"center"}>
          <ErrorIcon />
          <Text textStyle={"h3"}>{message}</Text>
        </Stack>
      }
      footer={
        <Button width={"100%"} onClick={() => setOpen(false)}>
          OK
        </Button>
      }
    />
  );
};

export const DialogWarning = (props: DialogMessageProps) => {
  const { message, ...rest } = props;
  const { setOpen } = rest;
  return (
    <DialogMessage
      {...rest}
      contentProps={{ width: "420px" }}
      body={
        <Stack alignItems={"center"}>
          <WarningIcon />
          <Text textStyle={"h3"}>Warning</Text>
          <Text textStyle={"content1"} color={"neutral.400"}>
            {message}
          </Text>
        </Stack>
      }
      footer={
        <Button width={"100%"} onClick={() => setOpen(false)}>
          OK
        </Button>
      }
    />
  );
};
