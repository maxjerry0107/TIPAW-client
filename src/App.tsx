import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { Box, Container } from './components/StyledComponents';

import { ApolloProvider, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { RequireAuth } from './components/RequireAuth';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("AUTH_TOKEN")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


const App = () => {
  return (
            <Routes>
              <Route path="signup" element={<Signup />} />
              <Route path="signin" element={<Signin />} />
              <Route path='/' element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } />
            </Routes>
  );
}

export default App;
