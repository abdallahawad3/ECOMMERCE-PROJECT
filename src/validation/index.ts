import * as yup from "yup";

export const LOGIN_SCHEMA = yup
  .object({
    email: yup
      .string()
      .required("The email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter Valid Email"),
    password: yup
      .string()
      .required("The Password is required")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Enter Valid Password"),
  })
  .required();

export const REGISTER_SCHEMA = yup
  .object({
    firstname: yup
      .string()
      .required("The First name is required")
      .min(5, "The minimum character length must be 5"),
    lastname: yup.string().optional(),
    username: yup
      .string()
      .required("The username is required")
      .min(5, "The minimum character length must be 5"),
    email: yup
      .string()
      .required("The email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter Valid Email"),
    password: yup
      .string()
      .required("The Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must include 1 uppercase, 1 lowercase, 1 number, and be 8+ characters."
      ),
  })
  .required();
