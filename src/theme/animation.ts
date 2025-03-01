import { defineAnimationStyles } from "@chakra-ui/react";

export const animationStyles = defineAnimationStyles({
  bounceFadeIn: {
    value: {
      animationName: "scale-down-hor-left",
      animationDuration: "0.4s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
    },
  },
});
