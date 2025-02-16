import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { Colors, SemanticColors } from "./color";
import { textStyles } from "./text-style";
import { buttonRecipe } from "./recipe/button";
import { radioGroupRecipe } from "./recipe/radio-group";
import { checkboxSlotRecipe } from "./recipe/checkbox";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: Colors,
    },
    semanticTokens: {
      colors: SemanticColors,
    },
    textStyles,
    recipes: {
      button: buttonRecipe,
      radioGroup: radioGroupRecipe,
    },
    slotRecipes: {
      checkbox: checkboxSlotRecipe,
    },
  },
  globalCss: {
    "*": {
      fontFamily: '"Roboto", serif',
    },
    html: {
      colorPalette: "primary",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
