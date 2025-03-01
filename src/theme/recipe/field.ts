import { defineSlotRecipe } from "@chakra-ui/react";

export const fieldSlotRecipe = defineSlotRecipe({
  slots: ["root", "control", "label"],
  base: {
    root: {
      "& .inner-label": {
        display: "flex",
        flexDir: "column",
        flexGrow: 1,
        py: "11px",
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
        "& .chakra-group": {
          height: "100%",
          alignItems: "flex-end !important",
          "&:has( div[data-group-item][data-first])": {
            "& ~label": {
              left: "34px",
            },
          },
        },
        "& input": {
          border: "none",
          height: "14px",
        },
      },
      "&[data-invalid]": {
        "& .container": {
          borderColor: "red.500",
          focusRingColor: "red.500",
        },
      },
      "& input": {
        fontSize: 16,
        lineHeight: 4,
        color: "neutral.600",
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
      "& .chakra-group": {
        w: "100%",
      },
    },
    label: {
      position: "absolute",
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
      "&.float": {
        pos: "absolute",
        px: "0.5",
        top: "-3",
        insetStart: "2",
        fontWeight: "normal",
        pointerEvents: "none",
        transition: "position",
        _peerPlaceholderShown: {
          color: "fg.muted",
          top: "6",
          insetStart: "3",
        },
        _peerFocusVisible: {
          color: "fg",
          top: "-2",
          insetStart: "2",
        },
      },
    },
  },
  variants: {
    size: {
      lg: {
        root: {
          "& > div": {
            height: "60px",
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
