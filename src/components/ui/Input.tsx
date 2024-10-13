import { useColorMode } from "@chakra-ui/react";
import { forwardRef, InputHTMLAttributes } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, IProps>(({ ...rest }, ref) => {
  const { colorMode } = useColorMode();
  return (
    <input
      autoComplete="off"
      {...rest}
      style={{
        color: colorMode == "dark" ? "#fff" : "#1A202C",
        background: colorMode == "dark" ? "#1A202C" : "#fff",
      }}
      ref={ref}
      className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg p-2  text-md w-full "
    />
  );
});

export default Input;
