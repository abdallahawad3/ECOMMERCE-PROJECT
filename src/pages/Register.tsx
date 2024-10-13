"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Input from "../components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_SCHEMA } from "../validation";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IErrorResponse, IRegisterInput } from "../interfaces";
import ErrorMessage from "../components/ErrorMessage";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>({
    resolver: yupResolver(REGISTER_SCHEMA),
  });

  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    try {
      const { status } = await axiosInstance.post("/auth/local/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (status == 200) {
        setIsLoading(true);
        setTimeout(() => {
          toast.success("Registration successful! Login Now.👋");
          setIsLoading(false);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const errorMsg = errorObj.response?.data.error.message;
      setIsLoading(false);
      toast.error(`${errorMsg}`, {
        position: "top-right",
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" {...register("firstname")} />
                    {errors.firstname?.message ? (
                      <ErrorMessage msg={errors.firstname?.message} />
                    ) : (
                      <></>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" {...register("lastname")} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" {...register("username")} />
                {errors.username?.message ? <ErrorMessage msg={errors.username?.message} /> : <></>}
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} />
                {errors.email?.message ? <ErrorMessage msg={errors.email?.message} /> : <></>}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} {...register("password")} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password?.message ? <ErrorMessage msg={errors.password?.message} /> : <></>}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}>
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to={"/login"} className={"text-blue-400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
