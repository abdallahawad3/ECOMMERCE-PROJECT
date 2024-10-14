import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface IProps {
  title: string;
  children: ReactNode;
  cancelTxt?: string;
  okText?: string;
  isOpen: boolean;
  onClose: () => void;
}

const CustomModal = ({
  title,
  okText = "Done",
  cancelTxt = "Cancel",
  children,
  isOpen,
  onClose,
}: IProps) => {
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {cancelTxt}
          </Button>
          <Button colorScheme="blue">{okText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
