import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Card,
  useColorMode,
} from "@chakra-ui/react";
import { sliceText } from "../utils";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import type { IProduct } from "../interfaces";
import { useAppDispatch } from "../app/store";
import { addItemsToCart } from "../app/feature/cart/CartSlice";
interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const colorMode = useColorMode();
  const dispatch = useAppDispatch();
  return (
    <Card shadow={"md"}>
      <CardBody>
        <Image
          src={`http://localhost:1337${product.thumbnail.url}`}
          alt={`${product.thumbnail.name}`}
          borderRadius="md"
          width={"60"}
          height={"60"}
          mx={"auto"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title}</Heading>
          <Text>{sliceText(product.description, 30)}</Text>
          <Text color="blue.600" fontSize={"lg"}>
            <span style={{ color: "red", fontWeight: "500", fontSize: "18px" }}>Price:</span> $
            {product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2" mx={"auto"}>
          <Button
            as={Link}
            to={`/product/${product.documentId}`}
            width={"full"}
            variant="solid"
            colorScheme={colorMode.colorMode === "light" ? "blue" : "cyan"}>
            Show Details
          </Button>
          <Button
            onClick={() => {
              dispatch(addItemsToCart(product));
            }}
            as={Link}
            to={"/"}
            rightIcon={<MdOutlineShoppingCart />}
            width={"full"}
            variant="outline"
            colorScheme={colorMode.colorMode === "light" ? "blue" : "cyan"}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
