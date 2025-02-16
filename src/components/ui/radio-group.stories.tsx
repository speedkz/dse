import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { RadioGroup, Radio } from "./radio";
import { HStack } from "@chakra-ui/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Radio Group",
  component: RadioGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
    colorPalette: {
      options: ["blue.500", "blue", "lg"],
      control: { type: "radio" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const options = [
  { text: "Radio 1", value: "0" },
  { text: "Radio 2", value: "1" },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ManyRadios: Story = {
  args: {
    defaultValue: "0",
  },
  render: (args) => {
    console.log(args)
    return (
      <RadioGroup {...args}>
        <HStack gap="6">
          {options.map(({ text, value }) => (
            <Radio value={value} key={value}>
              {text}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    );
  },
};
