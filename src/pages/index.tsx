import { useColorMode } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProductsList from "../components/ProductsList";

const HomePage = () => {
  const colorMode = useColorMode();
  return (
    <main>
      <Hero />
      <div style={{ background: colorMode.colorMode == "dark" ? "black" : "#eee" }}>
        <ProductsList />
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
