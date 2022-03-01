import { gql } from '@apollo/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  {client}  from '../../App';

interface UserState {
  isLogin:boolean,
  userdata:any,
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
}

const initialState: UserState = {
  isLogin:false, 
  userdata:{},
  isFetching: false,
  isSuccess: false,
  isError: false,
}

const SIGNUP = gql`
mutation Signup($firstname: String!, $lastname: String!, $phonenumber: String!, $email: String!, $password: String!) {
  signup(firstname:$firstname, lastname: $lastname, phonenumber: $phonenumber, email: $email, password: $password) {
    token
    user {
      firstname
      lastname
      phonenumber
      email
    }
  }
}`;

const SIGNIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      firstname
      lastname
      phonenumber
      email
    }
  }
}`;

interface UserAttributes {
  firstname: string
  lastname: string
  email: string
  phonenumber: string
  password: string
}

export const signupUser = createAsyncThunk<any, UserAttributes, any>(
  'users/signupUser',
  async (user, thunkAPI) => {
    try {
      const data = await client.mutate({mutation:SIGNUP, variables:{
        ...user
      }})
      localStorage.setItem('token', data.data.signup.token);
      return { ...data.data.signup };
    } catch (e:any) {
       console.log(e);
       return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loginUser = createAsyncThunk<any, UserAttributes, any>(
  'users/loginuser',
  async (user, thunkAPI) => {
    try {
      const data = await client.mutate({mutation:SIGNIN, variables:{
        ...user
      }})
      localStorage.setItem('token', data.data.login.token);
      return { ...data.data.login };
    } catch (e:any) {
       console.log(e);
       return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isLogin = true;
      state.userdata = {
        ...action.payload.user
      }
    });
    builder.addCase(signupUser.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.userdata = {
        ...action.payload.user
      }
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state:any) => state.user;

export default userSlice.reducer