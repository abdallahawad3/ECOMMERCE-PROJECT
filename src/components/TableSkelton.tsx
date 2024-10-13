import { Flex, Skeleton, Stack } from "@chakra-ui/react";

const TableSkelton = () => {
  return Array.from({ length: 10 }, (_, idx) => {
    return (
      <Stack key={idx}>
        <Flex
          border={"1px solid gray"}
          borderRadius={5}
          p={5}
          mb={2}
          w={"70%"}
          mx={"auto"}
          alignItems={"center"}
          justifyContent={"space-between"}
          h={50}>
          <Skeleton bg={"gray"} width={"120px"} rounded={"2xl"} height="10px" />
          <Skeleton bg={"gray"} width={"120px"} rounded={"2xl"} height="10px" />
          <Skeleton bg={"gray"} width={"120px"} rounded={"2xl"} height="10px" />
          <Skeleton bg={"gray"} width={"120px"} rounded={"2xl"} height="10px" />
          <Flex gap={2}>
            <Skeleton
              startColor="red.300"
              endColor="red.500"
              bg={"blue"}
              width={"50px"}
              height="20px"
            />
            <Skeleton
              startColor="blue.300"
              endColor="blue.500"
              bg={"red"}
              width={"50px"}
              height="20px"
            />
          </Flex>
        </Flex>
      </Stack>
    );
  });
};

export default TableSkelton;
