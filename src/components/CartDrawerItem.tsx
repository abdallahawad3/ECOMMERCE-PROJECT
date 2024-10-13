import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { IProduct } from "../interfaces";
import { sliceText } from "../utils";
import { removeItemsFromCart } from "../app/feature/cart/CartSlice";
import { useAppDispatch } from "../app/store";

interface IProps {
  product: IProduct;
}

const CartDrawerItem = ({ product }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        px={4}
        py={2}
        alignItems={"center"}
        variant="outline">
        <Image
          mr={5}
          objectFit="cover"
          width={20}
          height={20}
          rounded={"full"}
          src={`http://localhost:1337${product.thumbnail.url}`}
          alt={product.title}
        />
        <Stack>
          <CardBody p={0}>
            <Heading size="md">{sliceText(product.title, 10)}</Heading>
            <Text>Price: {product.price}$</Text>
            <Text>Quantity: {product.quantity}</Text>
          </CardBody>
          <CardFooter py={2} px={0}>
            <Button
              onClick={() => {
                dispatch(removeItemsFromCart(product));
              }}
              py={"1px"}
              variant="outline"
              colorScheme="red">
              Remove
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
