import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui";
import { Text } from "@chakra-ui/react";
import { DialogError, DialogMessage, DialogSuccess, DialogWarning } from ".";
import { useArgs } from "@storybook/preview-api";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Dialog Message",
  component: DialogMessage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  }, // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"], // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}, // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof DialogMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: "Dialog title",
    body: <Text textStyle={"h3"}>Content body</Text>,
    footer: <Button>Ok</Button>,
    setOpen: () => {},
  },
};
export const Success: Story = {
  args: { open: false, setOpen: () => {} },
  render: function Render(args) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, updateArgs] = useArgs();

    function setOpen(value: boolean) {
      updateArgs({ open: value });
    }

    return (
      <DialogSuccess
        {...args}
        message="Created successfully"
        setOpen={setOpen}
        triggerElement={<Button onClick={() => setOpen(true)}>Click me</Button>}
      />
    );
  },
};

export const Error: Story = {
  args: { open: false, setOpen: () => {} },
  render: function Render(args) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, updateArgs] = useArgs();

    function setOpen(value: boolean) {
      updateArgs({ open: value });
    }

    return (
      <DialogError
        {...args}
        message="Internet connection has been lost"
        setOpen={setOpen}
        triggerElement={<Button onClick={() => setOpen(true)}>Click me</Button>}
      />
    );
  },
};

export const Warning: Story = {
  args: { open: false, setOpen: () => {} },
  render: function Render(args) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, updateArgs] = useArgs();

    function setOpen(value: boolean) {
      updateArgs({ open: value });
    }

    return (
      <DialogWarning
        {...args}
        message="Message popup"
        setOpen={setOpen}
        triggerElement={<Button onClick={() => setOpen(true)}>Click me</Button>}
      />
    );
  },
};
