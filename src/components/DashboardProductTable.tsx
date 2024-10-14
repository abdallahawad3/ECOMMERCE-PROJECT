import { Button, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { sliceText } from "../utils";
import { useEffect, useState } from "react";
import TableSkelton from "./TableSkelton";
import { MdDelete, MdEdit } from "react-icons/md";
import { onOpenDialogAction } from "../app/feature/global/globalSlice";
import Dialog from "./ui/Dialog";
import { useAppDispatch } from "../app/store";
import {
  useDeleteDashboardProductMutation,
  useGetDashboardProductsQuery,
} from "../app/feature/services/apiSlice";
import type { IProduct } from "../interfaces";

const DashboardProductTable = () => {
  const [productClickedId, setProductClickedId] = useState("");
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDashboardProductsQuery({});
  const [destroyProduct, { isLoading: destroyLoading, isSuccess }] =
    useDeleteDashboardProductMutation({});
  useEffect(() => {
    if (isSuccess) {
      setProductClickedId("");
    }
  }, [isSuccess]);
  if (isLoading) return <TableSkelton />;

  return (
    <>
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
                    <Button
                      onClick={() => {
                        dispatch(onOpenDialogAction());
                        setProductClickedId(ele.documentId);
                      }}
                      mx={2}
                      colorScheme="red">
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
      <Dialog
        isLoading={destroyLoading}
        body="Are you sure you want to delete this product? This action cannot be undone."
        title="Delete Product"
        className="text-red-500"
        onDeleteHandler={() => destroyProduct(productClickedId)}
      />
    </>
  );
};

export default DashboardProductTable;
