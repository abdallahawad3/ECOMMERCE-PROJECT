import { Container, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import useAuthenticationQuery from "../hooks/useCusomHook";
import ProductSkeleton from "./ProductSkeleton";

const ProductsList = () => {
  const { data, isLoading } = useAuthenticationQuery({
    queryKey: ["data"],
    url: "/products?populate=*&sort=title",
  });

  if (isLoading)
    return (
      <Container maxWidth="7xl" py={"12"}>
        <Grid gridTemplateColumns="repeat(auto-fit,minmax(300px,1fr))" gap={"3"}>
          {Array.from({ length: 20 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </Grid>
      </Container>
    );

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
