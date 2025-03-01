import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { Colors, SemanticColors } from "./color";
import { textStyles } from "./text-style";
import { animationStyles } from "./animation";
import {
  buttonRecipe,
  radioGroupRecipe,
  checkboxSlotRecipe,
  fieldSlotRecipe,
  cardSlotRecipe,
  tableSlotRecipe,
} from "./recipe";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: Colors,
    },
    semanticTokens: {
      colors: SemanticColors,
    },
    textStyles,
    animationStyles,
    recipes: {
      button: buttonRecipe,
      radioGroup: radioGroupRecipe,
    },
    slotRecipes: {
      checkbox: checkboxSlotRecipe,
      field: fieldSlotRecipe,
      card: cardSlotRecipe,
      table: tableSlotRecipe,
    },
  },
  globalCss: {
    "*": {
      fontFamily: '"Roboto", serif',
      boxSizing: "border-box",
    },
    html: {
      colorPalette: "primary",
    },
    body: {
      margin: 0,
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
