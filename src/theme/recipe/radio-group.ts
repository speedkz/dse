import { defineRecipe } from "@chakra-ui/react";

export const radioGroupRecipe = defineRecipe({
  base: {
    colorPalette: "blue",
    _disabled: {
      colorPalette: "neutral.200",
    },
  },
});
