import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { onCloseDialogAction } from "../../app/feature/global/globalSlice";
// import { useDeleteDashboardProductMutation } from "../../app/feature/services/apiSlice";
interface IProps {
  title: string;
  body: ReactNode;
  className?: string;
  onDeleteHandler: () => void;
  isLoading: boolean;
}

const Dialog = ({ body, title, className, onDeleteHandler, isLoading }: IProps) => {
  const { isOpenDialog } = useSelector((state: RootState) => state.global);
  const dispatch = useAppDispatch();
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInTop"
        leastDestructiveRef={cancelRef}
        onClose={() => {
          dispatch(onCloseDialogAction());
        }}
        isOpen={isOpenDialog}
        isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody className={className}>{body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                dispatch(onCloseDialogAction());
              }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(onCloseDialogAction());
                onDeleteHandler();
              }}
              colorScheme="red"
              ml={3}
              isLoading={isLoading}
              loadingText="Loading">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default Dialog;
