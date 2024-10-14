import { Button, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { sliceText } from "../utils";
import { Fragment } from "react";
import TableSkelton from "./TableSkelton";
import { MdDelete, MdEdit } from "react-icons/md";
import { onOpenDialogAction } from "../app/feature/global/globalSlice";
import Dialog from "./ui/Dialog";
import { useAppDispatch } from "../app/store";
import { useGetDashboardProductsQuery } from "../app/feature/services/apiSlice";
import type { IProduct } from "../interfaces";

const DashboardProductTable = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDashboardProductsQuery({});

  if (isLoading) return <TableSkelton />;
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
          {data.data &&
            data?.data?.map((ele: IProduct) => (
              <Fragment key={ele.id}>
                <Tr>
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
                    <Button
                      onClick={() => {
                        dispatch(onOpenDialogAction());
                      }}
                      mx={2}
                      colorScheme="red">
                      <MdDelete />
                    </Button>
                    <Button colorScheme="blue">
                      <MdEdit />
                    </Button>
                  </Td>
                  <Td>
                    <Dialog
                      body="Are you sure you want to delete this product? This action cannot be undone."
                      title="Delete Product"
                      className="text-red-500"
                    />
                  </Td>
                </Tr>
              </Fragment>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DashboardProductTable;
