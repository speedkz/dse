import { defineSlotRecipe } from "@chakra-ui/react";

export const fieldSlotRecipe = defineSlotRecipe({
  slots: ["root", "control", "label"],
  base: {
    root: {
      "& .container": {
        display: "flex",
        flexDir: "column",
        w: "100%",
        borderColor: "neutral.100",
        borderWidth: "1px",
        borderRadius: "10px",
        justifyContent: "flex-end",
        "&:focus-within": {
          border: "solid 1px",
          borderColor: "primary.400",
        },
        _disabled: {
          bg: "neutral.50",
          "& input": {
            color: "neutral.200",
          },
          _placeholder: {
            color: "neutral.200",
          },
        },
        "&[data-invalid]": {
          "& .container": {
            borderColor: "red.500",
            focusRingColor: "red.500",
          },
        },
      },
      "& .chakra-group": {
        w: "100%",
        height: "100%",
        alignItems: "flex-end !important",
        "&:has( div[data-group-item][data-first])": {
          "& ~label": {
            left: "34px",
          },
        },
      },
      "& input": {
        borderRadius: "10px",
        bg: "transparent",
        border: "none",
        color: "neutral.600",
        transition: "all",
        "&:focus": {
          outline: "none",
        },
        _placeholder: {
          color: "neutral.400",
        },
      },
      "& span[data-part='error-text'], span[data-part='helper-text']": {
        fontSize: 12,
      },
      "& span[data-part='error-text']": {
        color: "red.500",
      },
      "& span[data-part='helper-text']": {
        color: "primary.500",
      },
    },
    label: {
      position: "absolute",
      opacity: 1,
      top: "11px",
      left: 3,
      width: "fit-content",
      color: "neutral.400",
      bg: "bg",
      fontSize: "14px",
      lineHeight: "14px",
      fontWeight: 400,
      _disabled: {
        opacity: 1,
      },
      pos: "absolute",
      px: "0.5",
      insetStart: "3",
      pointerEvents: "none",
      transition: "position",
    },
  },
  variants: {
    size: {
      lg: {
        root: {
          "& .container": {
            height: "60px",
            "& input": {
              height: "100%",
              py: "11px",
              fontSize: 16,
              lineHeight: 4,
            },
            "&:has(label)": {
              "& input": {
                height: "44px",
                "&:placeholder-shown": {
                  height: "100%",
                  "& ~label": {
                    opacity: 0,
                    top: "22px",
                  },
                },
                _focusVisible: {
                  height: "44px",
                  "& ~label": {
                    opacity: 1,
                    top: "11px",
                  },
                },
              },
            },
          },
        },
      },
      md: {
        root: {
          "& > div": {
            height: "48px",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});
