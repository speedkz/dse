import LoginBg from "@/assets/pages/login/LoginBg.jpg";
import { Box } from "@chakra-ui/react";
import { LoginForm } from "./login-form";

export const LoginContainer = () => {
  return (
    <Box
      pos={"relative"}
      w={"vw"}
      h={"vh"}
      bgColor={"primary.400"}
      bgSize={"cover"}
      display={"grid"}
      placeContent={"center"}
    >
      <Box
        pos={"absolute"}
        inset={0}
        bgImage={`url(${LoginBg})`}
        opacity={0.15}
      />
      <LoginForm />
    </Box>
  );
};
