import * as React from "react";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Container, Form, FormFooter, Header } from "../components/StyledComponents";
import tw from "twin.macro";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { signupUser, loginUser } from '../features/User/UserSlice'

import { useParams, useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export interface ISigninProps {}
const SubmitButton = tw.button`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

export default function Signin(props: ISigninProps) {
  let navigate = useNavigate();
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
    dispatch(loginUser(data)).then(()=>{
      navigate("/")
    })
  };

  return (
    <>
    
    <Container>
        <Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        
      <Header>Sign in</Header>
        <FormInput
          label={"Email"}
          id={"email"}
          required
          {...register("email")}
          error={errors.email}
        />
        <PasswordInput
          required
          label={"Password"}
          id={"password"}
          {...register("password")}
          error={errors.password}
        />
        <FormFooter>
          <SubmitButton type="submit">Login</SubmitButton>
        </FormFooter>
      </Form>
      </Box>
      </Container>
    </>
  );
}
