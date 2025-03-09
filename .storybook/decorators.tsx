// .storybook/withChakra.js
import React, { ReactNode } from "react";
import { PartialStoryFn } from "storybook/internal/types";
import { ReactRenderer } from "@storybook/react";
import { Toaster, Provider } from "../src/components/ui";

const ChakraProviderDecor = (
  StoryFn: PartialStoryFn<ReactRenderer, { [x: string]: ReactNode }>
) => (
  <Provider>
    <Toaster />
    <StoryFn />
  </Provider>
);

export default ChakraProviderDecor;
