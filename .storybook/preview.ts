import type { Preview } from "@storybook/react";
import ChakraProviderDecor from "./decorators";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [ChakraProviderDecor],
};

export default preview;
