import { Button, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { sliceText } from "../utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../app/store";
import { getAllProducts } from "../app/feature/dashboardProducts/productsSlice";
import TableSkelton from "./TableSkelton";
import { MdDelete, MdEdit } from "react-icons/md";

const DashboardProductTable = () => {
  const { products, loading } = useSelector((state: RootState) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) return <TableSkelton />;
  return (
    <TableContainer w={"90%"} mx={"auto"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Thumbnail</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody textAlign={"center"}>
          {products.map((ele) => (
            <Tr key={ele.id}>
              <Td>{ele.id}</Td>
              <Td>{sliceText(ele.title, 10)}</Td>
              <Td>{ele.category[0].title}</Td>
              <Td>
                <Image
                  src={`http://localhost:1337${ele.thumbnail.url}`}
                  alt={`${ele.thumbnail.name}`}
                  borderRadius="md"
                  width={"40px"}
                  height={"40px"}
                  rounded={"full"}
                />
              </Td>
              <Td>{ele.price}</Td>
              <Td>{ele.stock}</Td>
              <Td>
                <Button mx={2} colorScheme="red">
                  <MdDelete />
                </Button>
                <Button colorScheme="blue">
                  <MdEdit />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DashboardProductTable;
