import { defineSlotRecipe } from "@chakra-ui/react";

export const tableSlotRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "footer", "row", "columnHeader"],
  base: {
    root: {},
    header: {
      "& .chakra-table__columnHeader": {
        paddingInline: "15px",
        paddingBlock: 5,
      },
    },
    row: {},
    columnHeader: {
      pos: "relative",
      color: "neutral.400",
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "18px",
      "&::after": {
        content: "''",
        pos: "absolute",
        right: 0,
        w: "1px",
        h: "24px",
        bg: "neutral.200",
      },
    },
    body: {
      "& .chakra-table__row": {
        borderBottom: "solid 1px {colors.neutral.100}",
        "& td": {
          padding: "25px 15px",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
          color: "neutral.600",
        },
      },
    },
  },
  variants: {},
});
