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
  Container,
  Image,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import { logo } from "../assets/images";
// import Button from "./ui/Button";
const Links = ["Dashboard", "Products", "About", "Contact"];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const isLogin = false;
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")}>
        <Container maxWidth="7xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={5} alignItems={"center"}>
              <Box as={Link} to={"/"}>
                <Image
                  display={{ base: "none", md: "flex" }}
                  height={"40px"}
                  width={"40px"}
                  src={logo}
                  alt="Logo For lOGO"
                />
              </Box>
              <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                {isLogin ? (
                  Links.map((link) => (
                    <Link key={link} to={`/${link}`}>
                      {link}
                    </Link>
                  ))
                ) : (
                  <></>
                )}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              {isLogin ? (
                <>
                  <Button mx={2} onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </>
              ) : (
                <>
                  <Button mx={2} onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <Flex gap={"2"} display={{ base: "none", md: "flex" }}>
                    <Link className="hidden; md:flex" to={"/login"}>
                      <Button style={{ background: "#1d4ed8" }} className="py-[6px]">
                        Login
                      </Button>
                    </Link>
                    <Link className="hidden; md:flex" to={"/register"}>
                      <Button style={{ background: "#15803d " }} className="py-[6px]">
                        Sing Up
                      </Button>
                    </Link>
                  </Flex>
                </>
              )}
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {isLogin ? (
                  Links.map((link) => (
                    <Link key={link} to={`/${link}`}>
                      {link}
                    </Link>
                  ))
                ) : (
                  <Box>
                    <Link to={"/login"}>
                      <Button
                        mb={"2"}
                        width={"100%"}
                        style={{ background: "#1d4ed8" }}
                        className="py-[6px]">
                        Login
                      </Button>
                    </Link>
                    <Link to={"/register"}>
                      <Button
                        width={"100%"}
                        style={{ background: "#15803d " }}
                        className="py-[6px]">
                        Sing Up
                      </Button>
                    </Link>
                  </Box>
                )}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
