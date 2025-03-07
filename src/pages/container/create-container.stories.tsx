import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, spyOn, userEvent, within } from "@storybook/test";

import { CreateContainer } from ".";

import playWright from "@/helpers/play-wright";
import { faker } from "@faker-js/faker";
import { delay, http, HttpResponse } from "msw";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/CreateContainer",
  component: CreateContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  }, // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"], // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  }, // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof CreateContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const fns = {
  onSubmit: () => {},
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const TestData = {
  user: {
    userID: 1,
    name: "Someone",
  },
  document: {
    id: 1,
    userID: 1,
    title: "Something",
    brief: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "approved",
  },
  subdocuments: [
    {
      id: 1,
      userID: 1,
      title: "Something",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      status: "approved",
    },
  ],
};

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByTestId("name");
    const typeInput = canvas.getByTestId("type");
    const weightInput = canvas.getByTestId("weight");
    const capacityInput = canvas.getByTestId("capacity");
    const submitButton = canvas.getByTestId("submit");

    expect(submitButton).toBeDisabled();

    const { vehicle, type } = faker.vehicle;
    const { numeric } = faker.string;

    const userTypes = [
      { target: nameInput, value: vehicle() },
      { target: typeInput, value: type() },
      { target: weightInput, value: numeric() },
      { target: capacityInput, value: numeric() },
    ];
    const spy = spyOn(fns, "onSubmit");
    submitButton.addEventListener("click", fns.onSubmit);

    await playWright.handleUserType(userTypes);
    await userEvent.click(submitButton);

    expect(spy).toBeCalled();
    spy.mockRestore();
  },
};

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("https://api.example.com/container", () => {
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
        http.post("https://api.example.com/container", async () => {
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
