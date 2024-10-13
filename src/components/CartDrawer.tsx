import {
  Button,
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

const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector((state: RootState) => state.drawer);
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

          <DrawerBody>{/* BODY */}</DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                dispatch(onCloseCartDrawerAction());
              }}>
              Cancel
            </Button>
            <Button colorScheme="red">Clear All</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
