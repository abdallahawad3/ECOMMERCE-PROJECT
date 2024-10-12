import { Text } from "@chakra-ui/react";

interface IProps {
  msg: string;
}

const ErrorMessage = ({ msg }: IProps) => {
  return <Text color="red.600">{msg}</Text>;
};

export default ErrorMessage;
