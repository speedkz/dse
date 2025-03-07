import { Box, Text } from "@chakra-ui/react";
import { isValidElement, ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  children?: ReactNode;
}

interface PageContainerProps {
  children?: ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, children } = props;
  return (
    <Box display={"flex"} alignItems={"center"}>
      {isValidElement(title) ? (
        title
      ) : (
        <Text
          color={"neutral.600"}
          fontWeight={600}
          fontSize={28}
          lineHeight={"100%"}
        >
          {title}
        </Text>
      )}
      <Box flexGrow={1}></Box> {children}
    </Box>
  );
};

const PageContainer = (props: PageContainerProps) => {
  const { children } = props;
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      gap={5}
      w={"vw"}
      h={"vh"}
      p={"30px"}
      bgColor={"primary.50"}
      justifyContent={"center"}
    >
      {children}
    </Box>
  );
};

export { PageContainer, PageHeader };
