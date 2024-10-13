"use client";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CookieOptions, IErrorResponse, ILoginInput } from "../interfaces";
import { LOGIN_SCHEMA } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CookieService from "../services/CookieService";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({ resolver: yupResolver(LOGIN_SCHEMA) });

  const onSubmit: SubmitHandler<ILoginInput> = async (loginData) => {
    try {
      const { data, status } = await axiosInstance.post("/auth/local", {
        identifier: loginData.email,
        password: loginData.password,
      });

      if (status === 200) {
        const date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 3);
        const option: CookieOptions = { path: "/", expires: date };

        CookieService.set("jwt", data.jwt, option);
        setIsLoading(true);
        setTimeout(() => {
          toast.success("You Login Success", {
            position: "top-center",
          });
          setIsLoading(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const errorMsg = errorObj.response?.data.error.message;
      setIsLoading(false);
      toast.error(`${errorMsg}`, {
        position: "bottom-center",
      });
    }
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email")} />
              {errors.email?.message ? <ErrorMessage msg={errors.email?.message} /> : <></>}
            </FormControl>
            <FormControl id="password">
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
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}>
                <Checkbox className="space-y-5">Remember me</Checkbox>
              </Stack>
              <Button
                loadingText="Submitting"
                isLoading={isLoading}
                type="submit"
                colorScheme={"blue"}
                variant={"solid"}>
                Login
              </Button>
            </Stack>
          </form>

          <Stack pt={6}>
            <Text align={"center"}>
              Don't have account?{" "}
              <Link to={"/register"} className={"text-blue-400"}>
                Singup
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default LoginPage;
