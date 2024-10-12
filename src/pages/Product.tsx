("use client");
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MdArrowBack, MdLocalShipping } from "react-icons/md";
// import useAuthenticationQuery from "../hooks/useCusomHook";
import axiosInstance from "../config/axios.config";
import { useEffect, useState } from "react";
import type { IProduct } from "../interfaces";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const navigate = useNavigate();
  console.log(product);
  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axiosInstance.get(`/products/${id}?populate=*`);
        if (status === 200) {
          setProduct(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <Container maxW={"7xl"}>
      <Flex py={5}>
        <Button
          display={"inline-block"}
          variant={"link"}
          leftIcon={<MdArrowBack />}
          onClick={() => {
            navigate(-1);
          }}>
          Back
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <Flex>
          <Image
            rounded={"md"}
            alt={`${product?.thumbnail.name}`}
            src={`http://localhost:1337${product?.thumbnail.url}`}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
              {product?.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}>
              ${product?.price} USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
                width={"100%"}>
                {product?.description}
              </Text>
              <Text width={"100%"} fontSize={"lg"}>
                {product?.description}{" "}
              </Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Stock:
                  </Text>{" "}
                  {product?.stock}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Category:
                  </Text>{" "}
                  {product?.category[0].title}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Price:
                  </Text>{" "}
                  {product?.price}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}>
            Add to cart
          </Button>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Product;
