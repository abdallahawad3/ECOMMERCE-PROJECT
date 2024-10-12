import { Container, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import useAuthenticationQuery from "../hooks/useCusomHook";

const ProductsList = () => {
  const { data, isLoading } = useAuthenticationQuery({
    queryKey: ["data"],
    url: "/products?populate=*&sort=createdAt",
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Container maxWidth="7xl" py={"12"}>
      <Grid gridTemplateColumns="repeat(auto-fit,minmax(300px,1fr))" gap={"3"}>
        {data!.map((ele) => (
          <ProductCard product={ele} key={ele.id} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsList;
