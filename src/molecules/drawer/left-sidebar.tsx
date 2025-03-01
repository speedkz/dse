import {
  Box,
  HStack,
  IconButton,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { NavItem, SidebarMenus, SidebarMenusProps } from ".";

import {
  FiChevronLeft,
  FiCompass,
  FiHome,
  FiLogOut,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

import Logo from "@/assets/logos/Logo.svg?react";

export const LeftSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarProps = useMemo<SidebarMenusProps>(() => {
    const defaultValue: SidebarMenusProps = {
      title: <Text fontSize={32}>LOGO</Text>,
      items: [
        {
          name: "Home",
          icon: FiHome,
          items: [
            { name: "Trending", icon: FiTrendingUp },
            { name: "Explore", icon: FiCompass },
            { name: "Favourites", icon: FiStar },
            { name: "Settings", icon: FiSettings },
          ],
        },
        { name: "Trending", icon: FiTrendingUp },
        { name: "Explore", icon: FiCompass },
        { name: "Favourites", icon: FiStar },
        { name: "Settings", icon: FiSettings },
      ],
      headerProps: {
        borderBottom: "solid 1px",
        borderColor: "neutral.100",
      },
      contentProps: {
        width: "300px",
        pos: "fixed",
        inset: 0,
      },
      bodyProps: {
        px: 0,
      },
      footerProps: {
        boxShadow: "0px -3px 6px 0px #0000000F",
        px: 1,
        py: 0,
      },
      contentHeader: () => (
        <Box
          pos={"sticky"}
          bg="bg"
          top={-2}
          padding={"14px 15px"}
          textStyle={"title2"}
        >
          Hello, username
        </Box>
      ),
      footer: () => (
        <Stack
          direction={collapsed ? "column" : "row"}
          alignItems={"center"}
          w={"100%"}
          separator={<StackSeparator />}
        >
          <HStack flexGrow={1}>
            <NavItem
              w={"100%"}
              item={{
                icon: FiLogOut,
                name: "Log out",
              }}
            >
              {!collapsed && <Text textStyle={"content2"}>Log out</Text>}
            </NavItem>
          </HStack>
          <IconButton
            variant={"ghost"}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <FiChevronLeft />
          </IconButton>
        </Stack>
      ),
    };
    if (collapsed) {
      return {
        ...defaultValue,
        title: <Logo />,
        headerProps: { ...defaultValue.headerProps, p: 0 },
        contentProps: { ...defaultValue.contentProps, width: "52px" },
        bodyProps: { ...defaultValue.bodyProps, overflowX: "hidden" },
        contentHeader: undefined,
      };
    }
    return defaultValue;
  }, [collapsed]);

  return <SidebarMenus collapsed={collapsed} open={true} {...sidebarProps} />;
};
