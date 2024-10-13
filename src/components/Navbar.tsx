"use client";

import {
  Box,
  Flex,
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
import CookieService from "../services/CookieService";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../app/store";
import { onOpenCartDrawerAction } from "../app/feature/global/globalSlice";

const Links = ["Dashboard", "Products", "About", "Contact"];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLogin = CookieService.get("jwt");
  const { products } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
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
                  <Button
                    onClick={() => {
                      dispatch(onOpenCartDrawerAction());
                    }}>
                    Cart ({products.length})
                  </Button>
                  <Button mx={2} onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      window.location.assign("/");
                      CookieService.remove("jwt");
                    }}>
                    Logout
                  </Button>
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
