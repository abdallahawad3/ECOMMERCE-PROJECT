import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="50" />
      <SkeletonText mt="1" noOfLines={1} skeletonHeight="3" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="1" />
      <Flex justifyContent={"space-between"}>
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="1" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="1" />
      </Flex>
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="1" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="1" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="1" />
    </Box>
  );
};

export default ProductSkeleton;
