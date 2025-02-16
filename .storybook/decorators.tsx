// .storybook/withChakra.js
import React, { ReactNode } from "react";
import { Provider } from "../src/components/ui/provider";
import { PartialStoryFn } from "storybook/internal/types";
import { ReactRenderer } from "@storybook/react";

const ChakraProviderDecor = (
  StoryFn: PartialStoryFn<ReactRenderer, { [x: string]: ReactNode }>
) => (
  <Provider>
    <StoryFn />
  </Provider>
);

export default ChakraProviderDecor;
