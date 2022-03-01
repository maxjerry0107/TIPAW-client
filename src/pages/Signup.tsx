import * as React from "react";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Container, Form, FormFooter, Header } from "../components/StyledComponents";
import tw from "twin.macro";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { signupUser } from '../features/User/UserSlice'

const schema = yup.object().shape({
  firstname: yup.string().label("First name").required(),
  lastname: yup.string().label("Last name").required(),
  email: yup.string().label("Email").email().required(),
  phonenumber: yup
    .number()
    .label("Phone number")
    .required(),
    // .positive()
    // .integer()
    // .required()
    // .typeError("Vaild phone number is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export interface ISignupProps {}

const SubmitButton = tw.button`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

export default function Signup(props: ISignupProps) {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(signupUser(data))
  };

  return (
    <>
    
    <Container>
        <Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        
      <Header>Sign up</Header>
        <FormInput
          label={"First name"}
          id={"firstname"}
          required
          {...register("firstname")}
          error={errors.firstname}
        />
        <FormInput
          label={"Last name"}
          id={"lastname"}
          required={true}
          {...register("lastname")}
          error={errors.lastname}
        />
        <FormInput
          label={"Email"}
          id={"email"}
          required
          {...register("email")}
          error={errors.email}
        />
        <FormInput
          label={"Phone number"}
          id={"phonenumber"}
          required
          {...register("phonenumber")}
          error={errors.phonenumber}
        />
        <PasswordInput
          required
          label={"Password"}
          id={"password"}
          {...register("password")}
          error={errors.password}
        />
        <PasswordInput
          required
          label={"Confirm assword"}
          id={"confirm_password"}
          {...register("confirm_password")}
          error={errors.confirm_password}
        />
        <FormFooter>
          <SubmitButton type="submit">Save</SubmitButton>
        </FormFooter>
      </Form>
      </Box>
      </Container>
    </>
  );
}
