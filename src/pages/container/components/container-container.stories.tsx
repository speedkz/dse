import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ContainerContainer } from "..";
import { delay, http, HttpResponse } from "msw";
import { IContainer } from "@/services";
import { faker } from "@faker-js/faker";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/ContainerContainer",
  component: ContainerContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  }, // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"], // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  }, // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof ContainerContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TestData: IContainer[] = [...Array(20)].map((_) => ({
  name: faker.finance.accountName(),
  type: faker.finance.transactionType(),
  weight: faker.string.numeric(),
  capacity: faker.string.numeric(),
}));

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.example.com/container", async () => {
          await delay(800);
          return HttpResponse.json(TestData);
        }),
      ],
    },
  },
  play: async ({ context }) => {
    // Runs the FirstStory and Second story play function before running this story's play function
    await Default.play!(context);
  },
};

export const MockedError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.example.com/container", async () => {
          await delay(800);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
  play: async ({ context }) => {
    await Default.play!(context);
  },
};
