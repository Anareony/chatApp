import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSignInUserMutation } from "../model";

import { ROUTES } from "@/shared/constants/router";
import { AuthProps } from "@/shared/constants/types";

import {
  Box,
  Button,
  FormControl,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";

export function SignInForm() {
  const { register, handleSubmit } = useForm<AuthProps>();
  const [signInUser, { isLoading, isSuccess }] = useSignInUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      console.log("signin");
      router.replace(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<AuthProps> = (data) => {
    console.log(data);
    signInUser(data);
  };

  const handleOauth = async (event: any) => {
    event.preventDefault();
    window.location.href = `http://localhost:3002/auth/google/redirect`;
  };

  return (
    <>
      <Typography component="h1">Welcome Back!</Typography>
      <div>
        <Typography fontSize={"14px"}>
          <span>Don&apos;t have an account?</span>
          <MuiLink href={ROUTES.SIGN_UP} component={Link}>
            Sign Up
          </MuiLink>
        </Typography>
      </div>
      <Box
        onSubmit={handleSubmit(onSubmitHandler)}
        component="form"
        sx={{ width: "25%" }}
      >
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <TextField
            {...register("email")}
            name="email"
            label="Email"
            fullWidth
          />
          <TextField
            {...register("password")}
            name="password"
            label="Password"
            type="password"
            fullWidth
          />
          <Button type="submit" variant="contained" sx={{ width: "100%" }}>
            Sign In
          </Button>
          <MuiLink href="http://localhost:4000/auth/google/callback">
            Google
          </MuiLink>
        </FormControl>
      </Box>
    </>
  );
}
