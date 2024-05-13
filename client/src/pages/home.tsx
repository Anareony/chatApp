"use client";
import { Inter } from "next/font/google";
import {
  Box,
  Button,
  Container,
  FormControl,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { SignOutButton } from "@/features/auth/signout";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import PageLoader from "next/dist/client/page-loader";

const inter = Inter({ subsets: ["latin"] });

interface Account {
  id: number;
  name: string;
  surname: string;
  avatarUrl: string;
  ownerId: number;
}

export const getAccountApi = createApi({
  reducerPath: "getAccountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAccount: builder.query<Account, void>({
      query: () => ({ url: "/account" }),
    }),
    getAccountImage: builder.query({
      query: (imageUrl) => ({ url: `/account/profile-image/${imageUrl}` }),
    }),
  }),
});

export const { useGetAccountQuery, useGetAccountImageQuery } = getAccountApi;

export default function Home() {
  const { data, isLoading } = useGetAccountQuery();

  const { handleSubmit, control, reset } = useForm();
  const [messages, setMessages] = useState<any>();
  const [users, setUsers] = useState<any>();

  const socket = io("ws://localhost:4000/chat", {
    withCredentials: true,
  });

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  //many RERENDERS

  // useEffect(() => {
  //   function setMessagesEvent(value: any) {
  //     setMessages(value);
  //   }
  //   socket.emit("messages:get");
  //   socket.on("messages", setMessagesEvent);

  //   return () => {
  //     socket.off("messages", setMessagesEvent);
  //   };
  // }, [socket]);
  console.log(messages);
  const onSubmitHandler: SubmitHandler<any> = (message) => {
    socket.emit("message:post", {
      accountId: data?.ownerId,
      content: message.content,
    });
    reset();
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div>
          {users?.map((user: any, index: any) => {
            return <div key={index}>{user}</div>;
          })}
        </div>
        {messages ? (
          messages.map((message: any) => {
            return (
              <div key={message.id}>
                <div>{message.account.name}</div>
                <p>{message.content}</p>
              </div>
            );
          })
        ) : (
          <Skeleton />
        )}
        <Box
          onSubmit={handleSubmit(onSubmitHandler)}
          component="form"
          sx={{ width: "25%", margin: "20px" }}
        >
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField label="Message" value={value} onChange={onChange} />
            )}
          />
          <Button type="submit" variant="outlined">
            Send
          </Button>
        </Box>
        <SignOutButton />
      </Container>
    </>
  );
}
