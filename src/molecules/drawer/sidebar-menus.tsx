import { DrawerRoot } from "@/components/ui";
import {
  Box,
  Collapsible,
  DrawerBackdrop,
  DrawerBody,
  DrawerBodyProps,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerContentProps,
  DrawerFooter,
  DrawerFooterProps,
  DrawerHeader,
  DrawerHeaderProps,
  DrawerRootProps,
  DrawerTitle,
  DrawerTrigger,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import { FiChevronDown } from "react-icons/fi";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  items?: LinkItemProps[];
}

export interface NavItemProps extends FlexProps {
  item: LinkItemProps;
  children: ReactNode;
}

export interface SidebarContentProps {
  items: LinkItemProps[];
  contentHeader?: FC;
  collapsed?: boolean;
}

export interface SidebarMenusProps
  extends Omit<DrawerRootProps, "children">,
    SidebarContentProps {
  title?: ReactNode;
  footer?: FC;
  headerProps?: DrawerHeaderProps;
  contentProps?: DrawerContentProps;
  bodyProps?: DrawerBodyProps;
  footerProps?: DrawerFooterProps;
}

export const SidebarMenus = (props: SidebarMenusProps) => {
  const {
    title,
    headerProps,
    contentProps,
    bodyProps,
    footerProps,
    items,
    contentHeader,
    footer: FooterContent,
    collapsed,
    ...rest
  } = props;
  return (
    <DrawerRoot {...rest}>
      <DrawerBackdrop />
      <DrawerTrigger />
      <DrawerContent transition={"all 0.4s"} {...contentProps}>
        <DrawerCloseTrigger />
        <DrawerHeader {...headerProps}>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>

        <DrawerBody {...bodyProps}>
          <SidebarContent
            collapsed={collapsed}
            items={items}
            contentHeader={contentHeader}
          />
        </DrawerBody>

        <DrawerFooter {...footerProps}>
          {FooterContent && <FooterContent />}
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};
const SidebarContent = (props: SidebarContentProps) => {
  const { items, collapsed, contentHeader: ContentHeader } = props;
  return (
    <>
      {ContentHeader && <ContentHeader />}
      {items.map((item) => (
        <NavItem key={item.name} item={item}>
          {!collapsed ? item.name : ""}
        </NavItem>
      ))}
    </>
  );
};

export const NavItem = (props: NavItemProps) => {
  const {
    item: { icon, items },
    children,
    ...rest
  } = props;
  return (
    <Box w={"100%"} textDecoration={"none"} _focus={{ boxShadow: "none" }}>
      <Collapsible.Root>
        <Flex
          align="center"
          p="4"
          gap={4}
          className="group"
          cursor="pointer"
          color={"neutral.600"}
          _hover={{
            bg: "primary.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              size={"lg"}
              color={"neutral.400"}
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}

          {children && (
            <Text as={"div"} flexGrow={1} fontSize={16} lineHeight={"16px"}>
              {children}
            </Text>
          )}

          {!!items?.length && (
            <Collapsible.Trigger>
              <IconButton variant={"ghost"}>
                <FiChevronDown />
              </IconButton>
            </Collapsible.Trigger>
          )}
        </Flex>

        {!!items?.length && (
          <Collapsible.Content width={"100%"} pl={"19px"}>
            {items.map((item) => (
              <NavItem key={item.name} item={item}>
                {item.name}
              </NavItem>
            ))}
          </Collapsible.Content>
        )}
      </Collapsible.Root>
    </Box>
  );
};
