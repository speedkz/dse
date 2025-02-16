import { defineSlotRecipe } from "@chakra-ui/react";

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: ["root", "control", "label"],
  base: {
    root: {
      color: "primary.400",
      _disabled: {
        color: "neutral.200",
      },
    },
    control: {
      width: "22px",
      height: "22px",
      borderWidth: "1px",
      borderRadius: "sm",
      _checked: {
        colorPalette: "primary",
      },
    },
    label: {
      marginStart: "0",
      fontWeight: 400,
      _disabled: {
        opacity: 1,
      },
    },
  },
  variants: {
    direction: {
      reverse: {
        root: {
          flexDirection: "row-reverse",
        },
      },
    },
    visual: {
      circle: {
        control: {
          borderRadius: "50%",
        },
      },
    },
    size: {
      sm: {
        control: { width: "8", height: "8" },
        label: { fontSize: "sm" },
      },
      md: {
        control: { width: "10", height: "10" },
        label: { fontSize: "md" },
      },
    },
  },
});
