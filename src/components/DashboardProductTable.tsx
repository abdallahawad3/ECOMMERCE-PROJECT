import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { sliceText } from "../utils";
import { useEffect, useState, type ChangeEvent } from "react";
import TableSkelton from "./TableSkelton";
import { MdDelete, MdEdit } from "react-icons/md";
import { onOpenDialogAction } from "../app/feature/global/globalSlice";
import Dialog from "./ui/Dialog";
import { useAppDispatch } from "../app/store";
import {
  useDeleteDashboardProductMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
} from "../app/feature/services/apiSlice";
import type { IProduct } from "../interfaces";
import CustomModal from "./ui/CustomModal";
// import axiosInstance from "../config/axios.config";
// import CookieService from "../services/CookieService";

const DashboardProductTable = () => {
  const [productClickedId, setProductClickedId] = useState("");
  const [productEditClicked, setProductEditClicked] = useState<IProduct>();
  const [thumbnail, setThumbnail] = useState<File>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDashboardProductsQuery({});
  const [destroyProduct, { isLoading: destroyLoading, isSuccess }] =
    useDeleteDashboardProductMutation({});

  const [updateProduct, { isSuccess: updateSuccess }] = useUpdateDashboardProductMutation({});
  useEffect(() => {
    if (isSuccess) {
      setProductClickedId("");
    }
    if (updateSuccess) {
      onClose();
    }
  }, [isSuccess, updateSuccess, onClose]);
  if (isLoading) return <TableSkelton />;

  // Handlers..✅
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (productEditClicked) {
      setProductEditClicked({ ...productEditClicked, [name]: value });
    }
  };

  const onChangePriceHandler = (value: string) => {
    if (productEditClicked) {
      setProductEditClicked({ ...productEditClicked, price: +value });
    }
  };

  const onChangeStockHandler = (value: string) => {
    if (productEditClicked) {
      setProductEditClicked({ ...productEditClicked, stock: +value });
    }
  };

  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append("data[title]", `${productEditClicked?.title}`);
    formData.append("data[price]", `${productEditClicked?.price}`);
    formData.append("data[stock]", `${productEditClicked?.stock}`);
    formData.append("files.thumbnail", thumbnail!);

    updateProduct({ id: productEditClicked?.documentId, formBody: formData });
  };
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
                        setProductClickedId(ele.documentId);
                        dispatch(onOpenDialogAction());
                      }}
                      mx={2}
                      colorScheme="red">
                      <MdDelete />
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        setProductEditClicked(ele);
                        onOpen();
                      }}>
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
      <CustomModal
        onSubmit={onSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        title="Update Product">
        <FormControl my={4}>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            onChange={onChangeHandler}
            value={productEditClicked?.title}
            placeholder="Product Title"
          />
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            onChange={onChangePriceHandler}
            defaultValue={0}
            value={productEditClicked?.price}
            step={1}
            min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Stock</FormLabel>
          <NumberInput value={productEditClicked?.stock} onChange={onChangeStockHandler} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            name="thumbnail"
            alignContent={"center"}
            type="file"
            accept="image/*"
            onChange={(e) => {
              setThumbnail(e.target.files![0]);
            }}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductTable;
