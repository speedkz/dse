import { defineSlotRecipe } from "@chakra-ui/react";

export const cardSlotRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "footer"],
  base: {
    root: {
      borderRadius: "20px",
    },
  },
  variants: {},
});
