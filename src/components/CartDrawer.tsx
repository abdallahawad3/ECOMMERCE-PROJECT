import {
  Button,
  // Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../app/store";
import { onCloseCartDrawerAction } from "../app/feature/global/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearAllProducts } from "../app/feature/cart/CartSlice";

const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector((state: RootState) => {
    return state.global;
  });
  const { products } = useSelector((state: RootState) => {
    return state.cart;
  });

  const dispatch = useAppDispatch();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={() => {
          dispatch(onCloseCartDrawerAction());
        }}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>

          <DrawerBody>
            {products.map((item) => (
              <CartDrawerItem product={item} key={item.id} />
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                dispatch(onCloseCartDrawerAction());
              }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(clearAllProducts());
              }}
              colorScheme="red">
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
