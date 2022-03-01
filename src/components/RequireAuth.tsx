import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks'

import { userSelector } from "../features/User/UserSlice";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector(userSelector)
  console.log(user)
  if (!user.isLogin) {
    return <Navigate to="/signin"  replace />;
  }

  return children;
}