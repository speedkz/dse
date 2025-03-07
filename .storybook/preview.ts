import type { Preview } from "@storybook/react";
import ChakraProviderDecor from "./decorators";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

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
  loaders: [mswLoader],
};

export default preview;
