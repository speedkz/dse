import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Field } from ".";
import { Input } from "@chakra-ui/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Field",
  component: Field,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  }, // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"], // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  }, // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithLabel: Story = {
  args: {
    children: <Input placeholder="Placeholder text" />,
    label: "Label",
  },
};

export const FloatLabel: Story = {
  args: {
    children: <Input className="peer" placeholder="" />,
    label: "Label",
    labelFloating: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    children: <Input placeholder="Placeholder text" />,
    labelInner: false,
  },
};

export const WithHelperText: Story = {
  args: {
    children: <Input placeholder="Placeholder text" />,
    label: "Label",
    helperText: "Helper message here",
  },
};

export const WithErrorText: Story = {
  args: {
    children: <Input placeholder="Placeholder text" />,
    label: "Label",
    errorText: "Error message here",
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    children: <Input placeholder="Placeholder text" />,
    label: "Label",
    disabled: true,
  },
};
