"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { logo } from "../assets/images";
import Button from "./ui/Button";
interface Props {
  children: React.ReactNode;
}

const Links = ["Dashboard", "About", "Contact"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}>
      {children}
    </Box>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogin = false;
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} className="container">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link} to={"/"}>
              <img className="h-10 w-10" src={logo} alt="Logo For lOGO" />
            </Box>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              {isLogin ? Links.map((link) => <Link to={`/${link}`}>{link}</Link>) : <></>}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isLogin ? (
              <Avatar
                size={"sm"}
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            ) : (
              <Flex gap={"2"}>
                <Link to={"/login"}>
                  <Button style={{ background: "#1d4ed8" }} className="py-[6px]">
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button style={{ background: "#15803d " }} className="py-[6px]">
                    Sing Up
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {isLogin ? (
                Links.map((link) => <NavLink key={link}>{link}</NavLink>)
              ) : (
                <Flex gap={"2"}>
                  <Link to={"/login"}>
                    <Button style={{ background: "#1d4ed8" }} className="py-[6px]">
                      Login
                    </Button>
                  </Link>
                  <Link to={"/singup"}>
                    <Button style={{ background: "#15803d " }} className="py-[6px]">
                      Sing Up
                    </Button>
                  </Link>
                </Flex>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
