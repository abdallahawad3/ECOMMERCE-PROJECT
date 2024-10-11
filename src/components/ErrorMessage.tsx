interface IProps {
  msg: string;
}

const ErrorMessage = ({ msg }: IProps) => {
  return <p className="text-red-600">{msg}</p>;
};

export default ErrorMessage;
