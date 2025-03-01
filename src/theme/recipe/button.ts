import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "10px",
    _disabled: {
      bg: "neutral.200",
    },
  },
  variants: {
    variant: {
      solid: { bg: "primary.400", color: "white" },
      outline: {
        borderWidth: "1px",
        borderColor: "primary.400",
        color: "primary.400",
        bg: "neutral.0",
      },
    },
    size: {
      sm: { padding: "8px 15px", fontSize: "16px" },
      md: { padding: "12px 15px", fontSize: "16px" },
      lg: { padding: "15px", fontSize: "18px" },
    },
  },
  defaultVariants: {},
});
