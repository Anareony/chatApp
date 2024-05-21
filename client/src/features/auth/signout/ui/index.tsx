import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useSignOutUserMutation } from "../model";

import { ROUTES } from "@/shared/constants/router";

import { Button, Icon, IconButton } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

export function SignOutButton() {
  const [signOutUser, { isLoading, isSuccess }] = useSignOutUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      console.log("signout");
      router.replace(ROUTES.SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const signOut = () => {
    signOutUser();
  };

  return (
    <IconButton type="button" onClick={signOut}>
      <LogoutIcon sx={{ fontSize: "36px" }} color="error" />
    </IconButton>
  );
}
